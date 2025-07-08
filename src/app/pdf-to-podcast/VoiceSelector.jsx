import { useEffect, useState } from "react";

const VoiceSelector = ({ selectedVoice, setSelectedVoice }) => {
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    const fetchVoices = async () => {
      try {
        const res = await fetch("https://api.elevenlabs.io/v1/voices", {
          headers: {
            "xi-api-key": import.meta.env.VITE_ELEVENLABS_API_KEY,
          },
        });
        const data = await res.json();
        setVoices(data.voices || []);
      } catch (err) {
        console.error("Failed to fetch voices:", err);
      }
    };

    fetchVoices();
  }, []);

  return (
    <select
      className="border p-2 rounded"
      value={selectedVoice}
      onChange={(e) => setSelectedVoice(e.target.value)}
    >
      <option value="">Select Voice</option>
      {voices.map((voice) => (
        <option key={voice.voice_id} value={voice.voice_id}>
          {voice.name}
        </option>
      ))}
    </select>
  );
};

export default VoiceSelector;
