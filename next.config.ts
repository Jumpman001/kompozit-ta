import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 90 — hero (компенсирует зум-анимацию), 75 — остальные фото
    qualities: [75, 90],
  },
};

export default nextConfig;
