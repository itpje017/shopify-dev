const express = require("express");
const app = express.Router();
const { receiveWebhook } = require("@shopify/shopify-api");
const { verifyShopifyWebhook } = require("@middleware");

// Generic function to handle Shopify webhooks
const handleShopifyWebhook = (handler) => async (req, res) => {
  try {
    await receiveWebhook({
      rawBody: req.rawBody,
      rawRequest: req,
      rawResponse: res,
      webhookHandlers: handler,
    });
    // receiveWebhook send own 200 response
  } catch (err) {
    console.error("Webhook error:", err);
    if (err.message?.includes("Unexpected token") || err.message?.includes("invalid json")) {
      return res.status(400).send("Bad Request: Invalid JSON");
    }
    return res.status(500).send("Internal Server Error");
  }
};

app.post("/customers/data_request", verifyShopifyWebhook, handleShopifyWebhook({
    CUSTOMERS_DATA_REQUEST: async (topic, shop, body) => {
      console.log("CUSTOMERS_DATA_REQUEST", shop, body);
    },
  })
);

app.post("/customers/redact", verifyShopifyWebhook, handleShopifyWebhook({
    CUSTOMERS_REDACT: async (topic, shop, body) => {
      console.log("CUSTOMERS_REDACT", shop, body);
    },
  })
);

app.post("/shop/redact", verifyShopifyWebhook, handleShopifyWebhook({
    SHOP_REDACT: async (topic, shop, body) => {
      console.log("SHOP_REDACT", shop, body);
    },
  })
);

module.exports = app;
