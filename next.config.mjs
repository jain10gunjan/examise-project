/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'images.unsplash.com'
          },
          {
            protocol: 'https',
            hostname: 'd8it4huxumps7.cloudfront.net'
          },
        ],
      },
      compiler: {
        // Enables the styled-components SWC transform
        styledComponents: true
      }
};

export default nextConfig;
