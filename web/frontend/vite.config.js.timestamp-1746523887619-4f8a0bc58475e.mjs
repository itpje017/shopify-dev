// vite.config.js
import { defineConfig } from "file:///D:/hari/bkp-05-05-2025/web/node_modules/vite/dist/node/index.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import react from "file:///D:/hari/bkp-05-05-2025/node_modules/@vitejs/plugin-react/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///D:/hari/bkp-05-05-2025/web/frontend/vite.config.js";
if (process.env.npm_lifecycle_event === "build" && !process.env.CI && !process.env.SHOPIFY_API_KEY) {
  throw new Error(
    "\n\nThe frontend build will not work without an API key. Set the SHOPIFY_API_KEY environment variable when running the build command, for example:\n\nSHOPIFY_API_KEY=<your-api-key> npm run build\n"
  );
}
process.env.VITE_SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY;
var proxyOptions = {
  target: `http://127.0.0.1:${process.env.BACKEND_PORT}`,
  changeOrigin: false,
  secure: true,
  ws: false
};
var host = process.env.HOST ? process.env.HOST.replace(/https?:\/\//, "") : "localhost";
var hmrConfig;
if (host === "localhost") {
  hmrConfig = {
    protocol: "ws",
    host: "localhost",
    port: 64999,
    clientPort: 64999
  };
} else {
  hmrConfig = {
    protocol: "wss",
    host,
    port: process.env.FRONTEND_PORT,
    clientPort: 443
  };
}
var vite_config_default = defineConfig({
  root: dirname(fileURLToPath(__vite_injected_original_import_meta_url)),
  plugins: [react()],
  resolve: {
    preserveSymlinks: true
  },
  server: {
    host: "localhost",
    port: process.env.FRONTEND_PORT,
    hmr: hmrConfig,
    proxy: {
      "^/(\\?.*)?$": proxyOptions,
      "^/api(/|(\\?.*)?$)": proxyOptions
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxoYXJpXFxcXGJrcC0wNS0wNS0yMDI1XFxcXHdlYlxcXFxmcm9udGVuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcaGFyaVxcXFxia3AtMDUtMDUtMjAyNVxcXFx3ZWJcXFxcZnJvbnRlbmRcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2hhcmkvYmtwLTA1LTA1LTIwMjUvd2ViL2Zyb250ZW5kL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCB7IGRpcm5hbWUgfSBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCB9IGZyb20gXCJ1cmxcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcblxuaWYgKFxuICBwcm9jZXNzLmVudi5ucG1fbGlmZWN5Y2xlX2V2ZW50ID09PSBcImJ1aWxkXCIgJiZcbiAgIXByb2Nlc3MuZW52LkNJICYmXG4gICFwcm9jZXNzLmVudi5TSE9QSUZZX0FQSV9LRVlcbikge1xuICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgXCJcXG5cXG5UaGUgZnJvbnRlbmQgYnVpbGQgd2lsbCBub3Qgd29yayB3aXRob3V0IGFuIEFQSSBrZXkuIFNldCB0aGUgU0hPUElGWV9BUElfS0VZIGVudmlyb25tZW50IHZhcmlhYmxlIHdoZW4gcnVubmluZyB0aGUgYnVpbGQgY29tbWFuZCwgZm9yIGV4YW1wbGU6XCIgKyBcIlxcblxcblNIT1BJRllfQVBJX0tFWT08eW91ci1hcGkta2V5PiBucG0gcnVuIGJ1aWxkXFxuXCJcbiAgKTtcbn1cblxucHJvY2Vzcy5lbnYuVklURV9TSE9QSUZZX0FQSV9LRVkgPSBwcm9jZXNzLmVudi5TSE9QSUZZX0FQSV9LRVk7XG5cbmNvbnN0IHByb3h5T3B0aW9ucyA9IHtcbiAgdGFyZ2V0OiBgaHR0cDovLzEyNy4wLjAuMToke3Byb2Nlc3MuZW52LkJBQ0tFTkRfUE9SVH1gLFxuICBjaGFuZ2VPcmlnaW46IGZhbHNlLFxuICBzZWN1cmU6IHRydWUsXG4gIHdzOiBmYWxzZSxcbn07XG5cbmNvbnN0IGhvc3QgPSBwcm9jZXNzLmVudi5IT1NUXG4gID8gcHJvY2Vzcy5lbnYuSE9TVC5yZXBsYWNlKC9odHRwcz86XFwvXFwvLywgXCJcIilcbiAgOiBcImxvY2FsaG9zdFwiO1xuXG5sZXQgaG1yQ29uZmlnO1xuaWYgKGhvc3QgPT09IFwibG9jYWxob3N0XCIpIHtcbiAgaG1yQ29uZmlnID0ge1xuICAgIHByb3RvY29sOiBcIndzXCIsXG4gICAgaG9zdDogXCJsb2NhbGhvc3RcIixcbiAgICBwb3J0OiA2NDk5OSxcbiAgICBjbGllbnRQb3J0OiA2NDk5OSxcbiAgfTtcbn0gZWxzZSB7XG4gIGhtckNvbmZpZyA9IHtcbiAgICBwcm90b2NvbDogXCJ3c3NcIixcbiAgICBob3N0OiBob3N0LFxuICAgIHBvcnQ6IHByb2Nlc3MuZW52LkZST05URU5EX1BPUlQsXG4gICAgY2xpZW50UG9ydDogNDQzLFxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICByb290OiBkaXJuYW1lKGZpbGVVUkxUb1BhdGgoaW1wb3J0Lm1ldGEudXJsKSksXG4gIHBsdWdpbnM6IFtyZWFjdCgpXSxcbiAgcmVzb2x2ZToge1xuICAgIHByZXNlcnZlU3ltbGlua3M6IHRydWUsXG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIGhvc3Q6IFwibG9jYWxob3N0XCIsXG4gICAgcG9ydDogcHJvY2Vzcy5lbnYuRlJPTlRFTkRfUE9SVCxcbiAgICBobXI6IGhtckNvbmZpZyxcbiAgICBwcm94eToge1xuICAgICAgXCJeLyhcXFxcPy4qKT8kXCI6IHByb3h5T3B0aW9ucyxcbiAgICAgIFwiXi9hcGkoL3woXFxcXD8uKik/JClcIjogcHJveHlPcHRpb25zLFxuICAgIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBcVMsU0FBUyxvQkFBb0I7QUFDbFUsU0FBUyxlQUFlO0FBQ3hCLFNBQVMscUJBQXFCO0FBQzlCLE9BQU8sV0FBVztBQUhxSyxJQUFNLDJDQUEyQztBQUt4TyxJQUNFLFFBQVEsSUFBSSx3QkFBd0IsV0FDcEMsQ0FBQyxRQUFRLElBQUksTUFDYixDQUFDLFFBQVEsSUFBSSxpQkFDYjtBQUNBLFFBQU0sSUFBSTtBQUFBLElBQ1I7QUFBQSxFQUNGO0FBQ0Y7QUFFQSxRQUFRLElBQUksdUJBQXVCLFFBQVEsSUFBSTtBQUUvQyxJQUFNLGVBQWU7QUFBQSxFQUNuQixRQUFRLG9CQUFvQixRQUFRLElBQUksWUFBWTtBQUFBLEVBQ3BELGNBQWM7QUFBQSxFQUNkLFFBQVE7QUFBQSxFQUNSLElBQUk7QUFDTjtBQUVBLElBQU0sT0FBTyxRQUFRLElBQUksT0FDckIsUUFBUSxJQUFJLEtBQUssUUFBUSxlQUFlLEVBQUUsSUFDMUM7QUFFSixJQUFJO0FBQ0osSUFBSSxTQUFTLGFBQWE7QUFDeEIsY0FBWTtBQUFBLElBQ1YsVUFBVTtBQUFBLElBQ1YsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sWUFBWTtBQUFBLEVBQ2Q7QUFDRixPQUFPO0FBQ0wsY0FBWTtBQUFBLElBQ1YsVUFBVTtBQUFBLElBQ1Y7QUFBQSxJQUNBLE1BQU0sUUFBUSxJQUFJO0FBQUEsSUFDbEIsWUFBWTtBQUFBLEVBQ2Q7QUFDRjtBQUVBLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLE1BQU0sUUFBUSxjQUFjLHdDQUFlLENBQUM7QUFBQSxFQUM1QyxTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsRUFDakIsU0FBUztBQUFBLElBQ1Asa0JBQWtCO0FBQUEsRUFDcEI7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU0sUUFBUSxJQUFJO0FBQUEsSUFDbEIsS0FBSztBQUFBLElBQ0wsT0FBTztBQUFBLE1BQ0wsZUFBZTtBQUFBLE1BQ2Ysc0JBQXNCO0FBQUEsSUFDeEI7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
