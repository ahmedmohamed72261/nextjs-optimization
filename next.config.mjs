/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    // Add your image domains if needed
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
      },
    ],
  },
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  // Enable server actions
  experimental: {
    serverActions: true,
  },
  // Optimize output
  poweredByHeader: false,
  // Configure compression
  compress: true,
  // Support for audio files
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(wma|mp3)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          publicPath: '/_next/static/media/',
          outputPath: 'static/media/',
        },
      },
    });
    
    // Add support for font files
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
    });
    
    return config;
  },
  // i18n configuration for RTL support
  i18n: {
    locales: ['ar', 'en'],
    defaultLocale: 'ar',
    localeDetection: true,
    domains: [
      {
        domain: 'wizfreelance.com',
        defaultLocale: 'ar',
      },
    ],
  },
}

export default nextConfig
