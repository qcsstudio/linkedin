// next.config.js
import dotenv from 'dotenv';
dotenv.config();

const bucket = process.env.NEXT_PUBLIC_S3_BUCKET_NAME;
const region = process.env.NEXT_PUBLIC_AWS_REGION;

const nextConfig = {
  images: {
    domains: ["media.licdn.com", `${bucket}.s3.${region}.amazonaws.com`],
  },
};

export default nextConfig;
