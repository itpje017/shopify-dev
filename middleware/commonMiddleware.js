
const crypto = require("crypto");
const querystring = require("querystring");
const Shopify = require("shopify-api-node");
const SHOPIFY_API_SECRET = process.env.SHOPIFY_API_SECRET;
const HOST = process.env.HOST;

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
            const webhookUrl = `${HOST}/webhook/orders`;
            const topic = "orders/create";
            // Check if the webhook already exists
            const exists = webhooks.some(w => w.topic === topic && w.address === webhookUrl);

            if (exists) {
                return { message: "Webhook already exists" };
            }

            // Create new webhook if it doesn't exist
            const newWebhook = await shopify.webhook.create({ topic, address: webhookUrl,format: "json", });
            return newWebhook;

        } catch (error) {
            throw new Error("Webhook creation failed");
        }
    },

    // Function to handle the webhook
    verifyShopifyWebhook: (req, res, next) => {
        const hmacHeader = req.get("X-Shopify-Hmac-Sha256");
        const rawBody = req.rawBody; 
      
        const generatedHmac = crypto.createHmac("sha256", process.env.SHOPIFY_API_SECRET).update(rawBody, "utf8").digest("base64");
      
        if (crypto.timingSafeEqual(Buffer.from(hmacHeader, 'utf8'), Buffer.from(generatedHmac, 'utf8'))) {
          return next();
        } else {
          console.warn("Invalid HMAC - Unauthorized webhook");
          return res.status(401).send("Unauthorized");
        }
      }

};