const { createProduct, updateProduct, updateProductPrice} = require('@productController/product');

// Webhook function
const productWebhook = async (req, res) => {
    try {
        const productData = req.body;

    
        // Validate required fields
        if (!productData) {
            return res.status(400).json({ error: "Invalid product data received" });
        }

        // Call createProduct function and pass productData
        switch (productData.event) {
            case 'product_create':
                await createProduct(productData);
                break;
            case 'product_update':
                await updateProduct(productData);
                break;
            case 'product_price':
                await updateProductPrice(productData);
                break;
          
            default:
                return res.status(400).json({ error: "Invalid event type" });

        }



    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    productWebhook,
};
