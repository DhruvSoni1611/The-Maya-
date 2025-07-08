import { useState } from "react";

export function useImageGen({ email }) {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);

  const generateImage = async (prompt) => {
    setLoading(true);
    setError(null);
    setImageUrl(null);

    console.log("📤 Sending prompt to backend:", prompt);

    try {
      // 1. Generate from Replicate API
      const replicateRes = await fetch(
        `${import.meta.env.VITE_API_URL}/api/image/gen`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }),
        }
      );

      const data = await replicateRes.json();
      const outputImage = data.imageUrl;

      if (!outputImage) throw new Error("Image generation failed");

      // Then save to DB as before
      await fetch(`${import.meta.env.VITE_API_URL}/api/image/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          prompt,
          imageUrl: outputImage,
          format: "jpg",
        }),
      });
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
