const express = require("express");
const axios = require("axios");
const app = express();
const crypto = require("crypto");
const { verifyHmac } = require("@middleware");
const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY;
const SHOPIFY_API_SECRET = process.env.SHOPIFY_API_SECRET;
const SCOPES = "read_orders,write_orders,read_products,write_products,read_customers,read_draft_orders";
const NGROK_URL = process.env.NGROK_URL;
const REDIRECT_URI = process.env.REDIRECT_URI || `${NGROK_URL}/auth/callback`;
const REDIRECT_AFTER_INSTALL = process.env.REDIRECT_AFTER_INSTALL;
const APP_HANDLE = process.env.APP_HANDLE;
const { createWebhook } = require("@middleware");

// Route to initiate authentication
const getAuth = async (req, res) => {
    try {
        const { shop } = req.query;
        if (!shop) return res.status(400).json({ error: "Missing shop parameter" });

        const state = crypto.randomBytes(16).toString("hex");

        res.redirect(`/auth?shop=${shop}&state=${state}`);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

};
// Route to handle OAuth installation
const oAuthInstallation = async (req, res) => {
    try {
        const { shop, state } = req.query;
        if (!shop) return res.status(400).json({ error: "Missing shop parameter" });
        if (!state) return res.status(400).json({ error: "Missing state parameter" });

        const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${SHOPIFY_API_KEY}&scope=${SCOPES}&redirect_uri=${REDIRECT_URI}&state=${state}`;

        res.redirect(installUrl);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

};
// Route to handle OAuth callback
const oAuthCallback = async (req, res) => {
    const { shop, code, state, hmac } = req.query;
    if (!shop || !code) return res.status(400).json({ error: "Missing shop or code parameter" });

    // Verify HMAC to confirm Shopify sent the request
    if (!verifyHmac(req.query)) return res.status(400).json({ error: "HMAC validation failed" });

    try {
        const tokenResponse = await axios.post(`https://${shop}/admin/oauth/access_token`, {
            client_id: SHOPIFY_API_KEY,
            client_secret: SHOPIFY_API_SECRET,
            code,
        });
        const access_token = tokenResponse.data.access_token;
        
        await createWebhook(shop, access_token);

        const combinedData = { shop, access_token };
        const encodedData = Buffer.from(JSON.stringify(combinedData)).toString("base64");

        res.redirect(`${REDIRECT_AFTER_INSTALL}?data=${encodedData}`);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAuth,
    oAuthInstallation,
    oAuthCallback,
};
