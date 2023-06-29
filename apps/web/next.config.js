module.exports = {
  experimental: {
    typedRoutes: true,
  },
  reactStrictMode: false,
  swcMinify: true,
  output: 'standalone',
  transpilePackages: ['db', 'hooks', 'lib', 'ui'],
};
