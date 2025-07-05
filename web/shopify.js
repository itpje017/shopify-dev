import { BillingInterval, LATEST_API_VERSION } from "@shopify/shopify-api";
import { shopifyApp } from "@shopify/shopify-app-express";
import { SQLiteSessionStorage } from "@shopify/shopify-app-session-storage-sqlite";
import { restResources } from "@shopify/shopify-api/rest/admin/2024-10";
import path from "path";

const DB_PATH = `${process.cwd()}/database.sqlite`;

// Optional billing setup (enable if needed)
const billingConfig = {
  "My Shopify One-Time Charge": {
    amount: 5.0,
    currencyCode: "USD",
    interval: BillingInterval.OneTime,
  },
};

const shopify = shopifyApp({
  api: {
    apiKey: process.env.SHOPIFY_API_KEY,
    apiSecretKey: process.env.SHOPIFY_API_SECRET,
    apiVersion: LATEST_API_VERSION,
    restResources,
    hostName: process.env.HOST.replace(/^https?:\/\//, ""),
    scopes: process.env.SCOPES.split(","),
    billing: undefined, // ← Use billingConfig if needed
  },
  auth: {
    path: "/api/auth",
    callbackPath: "/api/auth/callback",
  },
  webhooks: {
    path: "/api/webhooks",
  },
  sessionStorage: new SQLiteSessionStorage(DB_PATH),
  hooks: {
    afterAuth: async ({ session, req, res }) => {
      const host = req.query.host;
      const shop = session.shop;

      res.redirect(`/?shop=${shop}&host=${host}`);
    },
  },
});

export default shopify;
