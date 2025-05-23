import React, { useState } from 'react';
import MonibucaPlayer from './MonibucaPlayer';
import './App.css';

function App() {
  const [streamUrl, setStreamUrl] = useState('wss://media.arcisai.io/jessica/DVR/RTSP-VSPL-114995-NTUJM.flv');
  const [isPlaying, setIsPlaying] = useState(false);
  const [decoderPath, setDecoderPath] = useState('/static/decoder.js');

  const handlePlay = () => {
    if (streamUrl) {
      setIsPlaying(true);
    } else {
      alert('Please enter a stream URL');
    }
  };

  const handleStop = () => {
    setIsPlaying(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Monibuca Stream Player</h1>
        <p>Play live streams from Monibuca v5 using Jessibuca-pro</p>
      </header>

      <div className="config-panel">
        <div className="form-group">
          <label htmlFor="streamUrl">Monibuca Stream URL:</label>
          <input
            type="text"
            id="streamUrl"
            value={streamUrl}
            onChange={(e) => setStreamUrl(e.target.value)}
            placeholder="e.g.,wss://media.arcisai.io/jessica/DVR/RTSP-VSPL-114995-NTUJM.flv"
            className="input-field"
          />
          <small className="help-text">Default URL is configured for your Monibuca setup</small>
        </div>

        <div className="form-group">
          <label htmlFor="decoderPath">Decoder Path:</label>
          <input
            type="text"
            id="decoderPath"
            value={decoderPath}
            onChange={(e) => setDecoderPath(e.target.value)}
            placeholder="Path to decoder.js file"
            className="input-field"
          />
          <small className="help-text">Decoder files are already in the correct location</small>
        </div>

        <div className="button-group">
          <button onClick={handlePlay} className="play-button" disabled={isPlaying}>
            Play Stream
          </button>
          <button onClick={handleStop} className="stop-button" disabled={!isPlaying}>
            Stop Stream
          </button>
        </div>
      </div>

      <div className="player-container">
        {isPlaying && (
          <MonibucaPlayer
            streamUrl={streamUrl}
            width={800}
            height={450}
            decoderPath={decoderPath}
            autoplay={true}
            debug={true}
            className="main-player"
          />
        )}
      </div>

      <div className="instructions">
        <h2>Instructions</h2>
        <ol>
          <li>Ensure your Monibuca server is running on localhost:8080</li>
          <li>The default stream URL is pre-configured based on your Monibuca config</li>
          <li>Decoder files are already placed in the correct location</li>
          <li>Click "Play Stream" to start playback</li>
          <li>If you encounter issues, check the browser console for detailed logs</li>
        </ol>
        
        <h3>Stream URL Format Based on Your Config</h3>
        <p>Based on your Monibuca configuration, the following stream URL formats are available:</p>
        <ul>
          <li><code>wss://media.arcisai.io/jessica/DVR/RTSP-VSPL-114995-NTUJM.flv</code> - HTTP-FLV (recommended)</li>
          <li><code>http://localhost:8080/flv/live/rtsp_stream.flv</code> - Direct FLV access</li>
          <li><code>http://localhost:8080/hls/live/rtsp_stream/index.m3u8</code> - HLS (if enabled)</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
