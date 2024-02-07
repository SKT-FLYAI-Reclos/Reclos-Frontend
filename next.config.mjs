/** @type {import('next').NextConfig} */

const withPlugins = require('next-compose-plugins');
const withPWA = require('next-pwa')({
  dest: 'public',
});

const nextConfig = {};

export default withPlugins([[withPWA, { pwa: { dest: 'public' } }]], nextConfig);
