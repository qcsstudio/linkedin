// next.config.js
import dotenv from "dotenv";
dotenv.config();

const bucket = process.env.NEXT_PUBLIC_S3_BUCKET_NAME;
const region = process.env.NEXT_PUBLIC_AWS_REGION;

const nextConfig = {
  images: {
    domains: ["media.licdn.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: `${bucket}.s3.${region}.amazonaws.com`,
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
    ],
  },
};

export default nextConfig;
