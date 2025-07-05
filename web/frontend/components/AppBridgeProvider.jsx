import React, { useState, useEffect } from "react";
import { AppProvider } from "@shopify/app-bridge-react";
import { PolarisProvider } from "@shopify/polaris";
import { createApp } from "@shopify/app-bridge";

export function ShopifyAppBridgeProvider({ children }) {
  const [app, setApp] = useState(null);
  const [shopOrigin, setShopOrigin] = useState(null);

  useEffect(() => {
    const shopOriginFromUrl = new URLSearchParams(window.location.search).get('shop');
    if (shopOriginFromUrl) {
      const appBridge = createApp({
        apiKey: process.env.SHOPIFY_API_KEY,
        shopOrigin: shopOriginFromUrl,
        forceRedirect: true,
      });

      setShopOrigin(shopOriginFromUrl);
      setApp(appBridge);
    }
  }, []);

  if (!app || !shopOrigin) {
    return <div>Loading...</div>;
  }

  return (
    <AppProvider config={{ apiKey: process.env.SHOPIFY_API_KEY, shopOrigin }}>
      <PolarisProvider>{children}</PolarisProvider>
    </AppProvider>
  );
}
