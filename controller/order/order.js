const axios = require("axios");
const orderPath = require("@orderRouter/orderPath");

const sendWebhook = async (success, data, eventType, message = null) => {
    const webhookUrl = `${process.env.WEBHOOK_URL}/${orderPath.ORDER_RESPONSE_WEBHOOK_URL}`;
    const payload = { success, data, eventType, message };
    try {
        await axios.post(webhookUrl, payload, { headers: { "Content-Type": "application/json" } });
    } catch (error) {
        console.error("Webhook error:", {message: error.message });
    }
};
// create order
const orders = async (req, res) => {
    const shop = req.headers["x-shopify-shop-domain"];
  
    // Validate request body
    if (!req.body?.line_items) {
        await sendWebhook(false, null, "ORDER_CREATION_FAILED", "Invalid order data");
        res.status(200).json({ message: "Invalid order data" });
        return;
    }
    // Filter for airventory items
    const airventoryItems = req.body.line_items.filter(item => item.vendor === "airventory");

    if (airventoryItems.length > 0) {
        await sendWebhook(true, req.body, "ORDER_CREATED", "Order created successfully");
        res.status(200).json({ message: "Order created successfully" });
        return ;
    } else {
        await sendWebhook(false, null, "ORDER_CREATION_FAILED", "No valid airventory items found");
        res.status(400).json({ error: "No valid airventory items found" });
        return;
    }
};

module.exports = {
    orders
};