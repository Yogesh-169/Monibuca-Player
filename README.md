# Monibuca Stream Player with Jessibuca-pro

This is a complete, ready-to-run React application for playing live streams from your Monibuca v5 media server using Jessibuca-pro player.

## Features

- Pre-configured for your specific Monibuca setup
- Decoder files already included and properly configured
- Stream URL pre-set based on your Monibuca configuration
- Easy-to-use interface with playback controls
- Responsive design for all device sizes

## Quick Start

1. **Ensure your Monibuca server is running**
   - Your Monibuca server should be running on localhost:8080
   - Verify your stream is active (rtsp_stream in your config)

2. **Start the React application**
   ```bash
   # Navigate to the project directory
   cd react-monibuca-complete

   # Start the development server
   npm start
   ```

3. **Access the player**
   - Open your browser to http://localhost:3000
   - Click the "Play Stream" button to start playback

## Stream URL Information

Based on your Monibuca configuration, the following stream URL is pre-configured:
```
http://localhost:8080/hdl/live/rtsp_stream.flv
```

This URL is derived from your configuration:
- The `location` mapping in your config maps `/hdl/(.*)` to `/flv/$1`
- Your RTSP stream is configured as `live/rtsp_stream`
- The FLV module is enabled for subscribing

## Decoder Files

The Jessibuca-pro decoder files are already included in this package:
- Located in: `/public/static/decoder.js` and `/public/static/decoder.wasm`
- Pre-configured in the player component

## Troubleshooting

If you encounter issues with playback:

1. **Verify your Monibuca server is running**
   ```bash
   # Check if the server is running and listening on port 8080
   curl http://localhost:8080
   ```

2. **Check if your stream is active**
   ```bash
   # Try accessing the stream directly
   curl -I http://localhost:8080/hdl/live/rtsp_stream.flv
   ```

3. **Browser console logs**
   - Open your browser's developer tools (F12)
   - Check the console for any error messages
   - Enable debug mode in the player for more detailed logs

4. **Decoder issues**
   - Ensure both decoder.js and decoder.wasm files are in the /public/static/ directory
   - Check network requests in browser dev tools to verify they're loading

## Customization

To use a different stream:

1. Change the URL in the input field to match your stream path
2. Format: `http://localhost:8080/hdl/live/your-stream-name.flv`

## Project Structure

- `/public/static/` - Contains decoder.js and decoder.wasm files
- `/src/MonibucaPlayer.js` - The main player component
- `/src/App.js` - The application interface
- `/node_modules/` - All dependencies (already installed)

## Additional Information

- This project was bootstrapped with Create React App
- It uses react-jessibuca for integration with Jessibuca-pro player
- All dependencies are pre-installed and configured
#   M o n i b u c a - P l a y e r  
 