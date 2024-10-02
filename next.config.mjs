/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true, // Active le répertoire app/ (nécessaire pour les Server Components et next/headers)
	},
	env: {
		JWT_SECRET: process.env.JWT_SECRET,
		NEXT_PUBLIC_EMAIL_SERVICE_ID: process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID,
		NEXT_PUBLIC_EMAIL_SERVICE_TEMPLATE_ID:
			process.env.NEXT_PUBLIC_EMAIL_SERVICE_TEMPLATE_ID,
		NEXT_PUBLIC_EMAIL_PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY,
		// Assurez-vous de définir cette variable dans votre fichier .env
	},
};

export default nextConfig;
