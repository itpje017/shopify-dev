import React from "react";
import { BrowserRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Navigation } from "@shopify/polaris";
import Routes from "./Routes";
import { ShopifyAppBridgeProvider } from "./components/ShopifyAppBridgeProvider";

export default function App() {
  const { t } = useTranslation();

  return (
    <ShopifyAppBridgeProvider>
      <BrowserRouter>
        {/* Navigation for your app */}
        <Navigation location="/">
          <Navigation.Section
            items={[
              {
                label: t("NavigationMenu.home"),
                url: "/",
              },
              {
                label: t("NavigationMenu.pageName"),
                url: "/pagename",
              },
            ]}
          />
        </Navigation>

        {/* Main Routes */}
        <Routes />
      </BrowserRouter>
    </ShopifyAppBridgeProvider>
  );
}
