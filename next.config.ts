import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'jejfpctlmwnzbjejiljo.supabase.co',
                pathname: '/storage/v1/object/public/files/**',
            },
        ],
    }
}
export default nextConfig;
