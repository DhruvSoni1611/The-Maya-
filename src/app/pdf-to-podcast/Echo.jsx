import VoiceSelector from "./VoiceSelector";
import { usePodcastGen } from "./usePodcastGen";

const Echo = () => {
  const {
    handleFileChange,
    voiceId,
    setVoiceId,
    format,
    setFormat,
    loading,
    error,
    downloadUrl,
    generateAudio,
  } = usePodcastGen();

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">📄 Convert PDF to Podcast 🎧</h1>

      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="mb-4"
      />

      <div className="space-y-2">
        <label className="block">🎙️ Select Voice:</label>
        <VoiceSelector selectedVoice={voiceId} setSelectedVoice={setVoiceId} />
      </div>

      <div className="space-y-2">
        <label className="block">⚙️ Select Format:</label>
        <select
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="mp3">MP3</option>
          <option value="wav">WAV</option>
        </select>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <button
        onClick={generateAudio}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Processing..." : "Convert to Audio"}
      </button>

      {downloadUrl && (
        <div className="mt-4">
          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 underline"
          >
            🎧 Download Your Podcast
          </a>
        </div>
      )}
    </div>
  );
};

export default Echo;
