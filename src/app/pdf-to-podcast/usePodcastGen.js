import { useState } from "react";

export const usePodcastGen = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [voiceId, setVoiceId] = useState("");
  const [format, setFormat] = useState("mp3");
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const generateAudio = async () => {
    if (!pdfFile || !voiceId) {
      setError("Please upload a PDF and select a voice.");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("pdf", pdfFile);
    formData.append("voiceId", voiceId);
    formData.append("format", format);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/echo/echo`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setDownloadUrl(`${import.meta.env.VITE_API_URL}${data.downloadUrl}`);
      } else {
        setError(data.error || "Failed to generate audio.");
      }
    } catch (err) {
      setError("Something went wrong.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    pdfFile,
    setPdfFile,
    handleFileChange,
    voiceId,
    setVoiceId,
    format,
    setFormat,
    loading,
    error,
    downloadUrl,
    generateAudio,
  };
};
