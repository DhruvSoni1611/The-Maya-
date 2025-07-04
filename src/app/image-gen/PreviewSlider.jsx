import { useState } from "react";

const formats = ["jpg", "png", "webp"];

const PreviewSlider = ({ imageUrl }) => {
  const [format, setFormat] = useState("jpg");

  const pixelbinBase = import.meta.env.VITE_PIXELBIN_BASE_URL;

  const transformedImage = `${pixelbinBase}/original/${encodeURIComponent(
    imageUrl
  )}?f_auto=true&format=${format}`;

  return (
    <div className="w-full mt-6">
      <div className="flex gap-4">
        {formats.map((fmt) => (
          <button
            key={fmt}
            className={`px-3 py-1 rounded border ${
              format === fmt ? "bg-blue-600 text-white" : "bg-white"
            }`}
            onClick={() => setFormat(fmt)}
          >
            {fmt.toUpperCase()}
          </button>
        ))}
      </div>

      <img
        src={transformedImage}
        alt="Generated"
        className="w-full max-w-md mt-4 rounded-lg shadow-lg"
      />

      <a
        href={transformedImage}
        download={`generated.${format}`}
        className="mt-4 inline-block px-4 py-2 bg-black text-white rounded"
      >
        Download
      </a>
    </div>
  );
};

export default PreviewSlider;
