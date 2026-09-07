import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
        serverActions: {
            bodySizeLimit: '100mb',
        }
    },
  images: {remotePatterns: [
          { protocol: 'https', hostname: 'covers.openlibrary.org' },
          { protocol: 'https', hostname: '0hewkr0pb8b4qubb.public.blob.vercel-storage.com' }
      ]}
};

export default nextConfig;
