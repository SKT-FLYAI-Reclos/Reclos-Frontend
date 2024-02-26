import { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } from 'next/constants.js';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    // 'https://reclosbucket.s3.ap-northeast-2.amazonaws.com/*'
    remotePatterns: [
      { protocol: 'https', hostname: 'reclosbucket.s3.ap-northeast-2.amazonaws.com', port: '', pathname: '/**/*' },
      { protocol: 'https', hostname: 'reclosbucket.s3.ap-northeast-2.amazonaws.com', port: '', pathname: '/*' },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/v2/:path*/',
        destination: `${process.env.NEXT_PUBLIC_DEV_BASE_URL}/:path*/`,
      },
    ];
  },
  trailingSlash: true,

  // svg 사용할 때 <Icon /> 처럼 사용하기 위함
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

const nextConfigFunction = async (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    const withPWA = (await import('@ducanh2912/next-pwa')).default({
      dest: 'public',
      register: true,
    });
    return withPWA(nextConfig);
  }
  return nextConfig;
};

export default nextConfigFunction;

// export default withPlugins([[withPWA, { pwa: { dest: 'public' } }]], nextConfig);
