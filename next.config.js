/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [], // Adicione aqui os domínios permitidos para imagens, se necessário
  },
};

module.exports = nextConfig; 