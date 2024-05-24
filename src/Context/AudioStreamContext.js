import React, { createContext, useContext, useState, useEffect } from "react";

const AudioStreamContext = createContext();

export function useAudioStream() {
  return useContext(AudioStreamContext);
}

export function AudioStreamProvider({ children }) {
  const [audioStream, setAudioStream] = useState(null);

  useEffect(() => {
    const getAudioStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        setAudioStream(stream);
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    };

    getAudioStream();
  }, []);

  return (
    <AudioStreamContext.Provider value={audioStream}>
      {children}
    </AudioStreamContext.Provider>
  );
}
