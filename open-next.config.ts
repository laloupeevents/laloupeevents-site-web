import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// Site vitrine entièrement pré-rendu : les pages sont servies depuis les assets statiques,
// sans revalidation (pas besoin de R2 ni de KV).
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
