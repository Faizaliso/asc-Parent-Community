/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
		  {
			hostname: process.env.R2_PUBLIC_URL,
			pathname: "/**",
			protocol: "https",
		  },
		],
	  },
};

export default nextConfig;
