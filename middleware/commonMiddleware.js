const express = require("express");
const axios = require("axios");
const app = express();
const crypto = require("crypto");
const querystring = require("querystring");
const Shopify = require("shopify-api-node");
const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY;
const SHOPIFY_API_SECRET = process.env.SHOPIFY_API_SECRET;
const NGROK_URL = process.env.NGROK_URL;

//  Verify the request's HMAC to ensure it is coming from Shopify.
module.exports = {
    verifyHmac: async (query) => {
        const { hmac, ...params } = query;
        if (!hmac) return false;

        const orderedParams = querystring.stringify(params, "&", "=", { encodeURIComponent: querystring.unescape });
        const generatedHmac = crypto.createHmac("sha256", SHOPIFY_API_SECRET).update(orderedParams).digest("hex");

        return crypto.timingSafeEqual(Buffer.from(generatedHmac, "utf-8"), Buffer.from(hmac, "utf-8"));
    },
    // create weebhook
    createWebhook: async (shop, token) => {
        try {
            const shopify = new Shopify({ shopName: shop.replace(".myshopify.com", ""), accessToken: token });

            // Get existing webhooks
            const webhooks = await shopify.webhook.list();
            const webhookUrl = `${NGROK_URL}/webhook/orders`;
            const topic = "orders/create";

            // Check if the webhook already exists
            const exists = webhooks.some(w => w.topic === topic && w.address === webhookUrl);

            if (exists) {
                return { message: "Webhook already exists" };
            }

            // Create new webhook if it doesn't exist
            const newWebhook = await shopify.webhook.create({ topic, address: webhookUrl,format: "json" });
            return newWebhook;

        } catch (error) {
            throw new Error("Webhook creation failed");
        }
    }


};