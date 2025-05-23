import React, { useEffect, useRef, useState } from 'react';
import JessibucaPlayer from 'react-jessibuca';
import './MonibucaPlayer.css';

// Global decoder configuration (optional)
// Uncomment and set the path to your decoder.js file if you want to set it globally
// setDecoder("/static/decoder.js");

const MonibucaPlayer = ({ 
  streamUrl = "http://localhost:8080/hdl/live/rtsp_stream.flv", // Default stream URL based on your config
  width = 640, 
  height = 360, 
  autoplay = true,
  decoderPath = "/static/decoder.js", // Path to decoder.js file in public/static
  objectFit = "contain",
  mute = false,
  debug = false,
  loadingText = "Loading stream...",
  onError = null,
  className = ""
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(null);
  const playerRef = useRef(null);

  // Handle errors
  const handleError = (err) => {
    console.error('Jessibuca player error:', err);
    setError(`Stream error: ${err}`);
    if (onError) onError(err);
  };

  // Handle player events
  const handleStart = () => {
    console.log('Jessibuca player started');
    setIsPlaying(true);
    setError(null);
  };

  useEffect(() => {
    if (playerRef.current) {
      console.log('Jessibuca player initialized');
      playerRef.current.on('loading', () => console.log('Jessibuca loading'));
      playerRef.current.on('kBps', (kbps) => console.log('Jessibuca kbps:', kbps));
      playerRef.current.on('videoInfo', (info) => console.log('Jessibuca video info:', info));
      playerRef.current.on('resolution', (w, h) => console.log('Jessibuca resolution:', w, h));
      playerRef.current.on('timeout', () => console.log('Jessibuca timeout'));
      playerRef.current.on('loadingTimeout', () => console.log('Jessibuca loading timeout'));
    }
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, []);

  // Handle player pause
  const handlePause = () => {
    setIsPlaying(false);
  };

  // Toggle play/pause
  const togglePlayback = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pause();
      } else {
        playerRef.current.play();
      }
    }
  };

  // Player configuration
  const playerConfig = {
    // Decoder configuration
    decoder: decoderPath,
    // Video display settings
    videoBuffer: 0.2, // 200ms buffer for low latency
    audioBuffer: 0.2,
    forceNoOffscreen: true,
    isResize: true,
    isFlv: true, // Set to true for FLV streams from Monibuca
    hasAudio: true,
    hasVideo: true,
    supportDblclickFullscreen: true,
    showBandwidth: true,
    operateBtns: {
      fullscreen: true,
      screenshot: true,
      play: true,
      audio: true,
      record: false
    }
  };

  return (
    <div className={`monibuca-player-container ${className}`}>
      <JessibucaPlayer
        src={streamUrl}
        width={width}
        height={height}
        config={playerConfig}
        decoder={decoderPath}
        mute={mute}
        debug={debug}
        objectFit={objectFit}
        loadingText={loadingText}
        controls={true}
        onError={handleError}
        onStart={handleStart}
        onPause={handlePause}
        ref={playerRef}
      />
      
      {error && (
        <div className="player-error">
          {error}
        </div>
      )}
      
      <div className="player-controls">
        <button onClick={togglePlayback}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
    </div>
  );
};

export default MonibucaPlayer;
