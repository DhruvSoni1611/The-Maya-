import { useState } from "react";

export function useImageGen({ userId, email }) {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);

  const generateImage = async (prompt) => {
    setLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      // 1. Call Replicate API (SDXL or similar)
      const response = await fetch("https://api.replicate.com/v1/predictions", {
        method: "POST",
        headers: {
          Authorization: `Token ${import.meta.env.VITE_REPLICATE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          version: "db21e45e...your_model_version_here",
          input: { prompt },
        }),
      });

      const prediction = await response.json();
      const finalImage = prediction?.output?.[0];

      if (!finalImage) throw new Error("Image generation failed.");

      // 2. Save to your backend (via API)
      const res = await fetch("/api/image/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, imageUrl: finalImage, userId, email }),
      });

      const result = await res.json();
      if (!result.success) throw new Error("Error saving to DB");

      setImageUrl(finalImage);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return {
    loading,
    error,
    imageUrl,
    generateImage,
  };
}
