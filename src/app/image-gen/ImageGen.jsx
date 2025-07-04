import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useImageGen } from "./useImageGen";
import PreviewSlider from "./PreviewSlider";
import AnimatedTitle from "../../components/AnimatedTitle";

const ImageGen = () => {
  const { user } = useUser();
  const [prompt, setPrompt] = useState("");
  const { loading, error, imageUrl, generateImage } = useImageGen({
    userId: user?.id,
    email: user?.primaryEmailAddress?.emailAddress,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt) return;
    generateImage(prompt);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <AnimatedTitle
        title="<b>N</b>exus: Generate an Imag<b>e</b>"
        className="special-font !md:text-[6.2rem] w-full font-zentry !text-2xl !leading-[.9]"
      />

      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the image you want..."
          className="w-full p-3 border rounded shadow"
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded"
        >
          {loading ? "Generating..." : "Generate Image"}
        </button>
      </form>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {imageUrl && <PreviewSlider imageUrl={imageUrl} />}
    </div>
  );
};

export default ImageGen;
