/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true, // Active le répertoire app/ (nécessaire pour les Server Components et next/headers)
    },
    env: {
        JWT_SECRET: process.env.JWT_SECRET, // Assurez-vous de définir cette variable dans votre fichier .env
    },
};

export default nextConfig;