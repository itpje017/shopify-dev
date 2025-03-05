const axios = require("axios");
const Shopify = require("shopify-api-node");
const productPath = require('@productRouter/productPath');

const sendWebhook = async (success, data, sync_entry = null, eventType, errorMessage = null) => {
    try {
        const webhookUrl = `${process.env.WEBHOOK_URL}/${productPath.PRODUCT_RESPONSE_WEBHOOK_URL}`;
        await axios.post(webhookUrl, { success, eventType, data, sync_entry, errorMessage },
            {
                headers: { "Content-Type": "application/json" }
            });
    } catch (error) {
        console.error("Webhook error:", { message: error.message });
    }
};

const createProduct = async (productData, res) => {
    try {
       
        var sync_entry = productData.sync_entry;


        if (!productData || !productData.shop_data || !productData.data) {
            await sendWebhook(false, null, sync_entry, "PRODUCT_CREATION_FAILED", "Invalid product data");
            return;
        }

        const { shop_link: shop, access_token: token } = productData.shop_data;

        if (!shop || !token) {
            await sendWebhook(false, null, sync_entry, "PRODUCT_CREATION_FAILED", "Missing access_token or shop parameter");
            return;
        }


        const shopify = new Shopify({ shopName: shop.replace(".myshopify.com", ""), accessToken: token });
        const createdProduct = await shopify.product.create(productData.data.product);

        if (!createdProduct?.id) {
            await sendWebhook(false, null, sync_entry, "PRODUCT_CREATION_FAILED", "Product creation failed on Shopify");
            return;
        }

        await sendWebhook(true, createdProduct, sync_entry, "PRODUCT_CREATED", "Product created successfully");
        return;
    } catch (error) {
        await sendWebhook(false, null, sync_entry, "PRODUCT_CREATION_FAILED", error.message);
        return res.status(500).json({ error: error.message });
    }
};

const updateProduct = async (productData, res) => {
    try {
        let { shop_data,  data, sync_entry} = productData;
        let shop = shop_data?.shop_link;
        let token = shop_data?.access_token;
        let product = data?.product;


        if (!shop || !token || !product?.id) {
            await sendWebhook(false, null, sync_entry, "PRODUCT_UPDATE_FAILED", "Missing access_token, shop parameter, or product ID");
            return;
        }

        const shopify = new Shopify({ shopName: shop.replace(".myshopify.com", ""), accessToken: token });
        const updatedProduct = await shopify.product.update(product.id, product);
        await sendWebhook(true, updatedProduct, sync_entry, "PRODUCT_UPDATED", "Product updated successfully");

    } catch (error) {
        await sendWebhook(false, null, sync_entry, "PRODUCT_UPDATE_FAILED", error.message);
        return res.status(500).json({ error: error.message });
    }
};

const updateProductPrice = async (productData, res) => {
    try {
       
        let { shop_data, variant } = productData;
        let shop = shop_data?.shop_link;
        let token = shop_data?.access_token;

        if (!shop || !token || !variant?.id || variant.price === undefined) {
            await sendWebhook(false, null, "PRICE_UPDATE_FAILED", "Missing shop data, access token, variant ID, or price");
            return;
        }

        const shopify = new Shopify({ shopName: shop.replace(".myshopify.com", ""), accessToken: token });
        const updatedVariant = await shopify.productVariant.update(variant.id, { price: variant.price });

        // await sendWebhook(true, updatedVariant, "PRICE_UPDATED", "Product price updated successfully");

    } catch (error) {
        await sendWebhook(false, null, "PRICE_UPDATE_FAILED", error.message);
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createProduct,
    updateProduct,
    updateProductPrice

};
