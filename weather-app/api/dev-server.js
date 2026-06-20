/**
 * Local development server for the API handler.
 * Run with: node api/dev-server.js
 * This mimics the Vercel serverless function locally.
 */
import http from 'http';

// Load .env file
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, '..', '.env');

let API_KEY = process.env.VITE_OPENWEATHER_API_KEY;
if (!API_KEY) {
  try {
    const envContent = readFileSync(envPath, 'utf-8');
    const match = envContent.match(/VITE_OPENWEATHER_API_KEY=(.+)/);
    if (match) API_KEY = match[1].trim();
  } catch {
    console.error('❌ No API key found. Create a .env file with VITE_OPENWEATHER_API_KEY');
    process.exit(1);
  }
}

const PORT = 3001;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const server = http.createServer(async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') return res.end();
  if (req.method !== 'GET') return res.end(JSON.stringify({ error: 'Method not allowed' }));

  const url = new URL(req.url, `http://localhost:${PORT}`);
  const { city, lat, lon } = Object.fromEntries(url.searchParams);

  let apiUrl;
  if (city) {
    apiUrl = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
  } else if (lat && lon) {
    apiUrl = `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  } else {
    res.writeHead(400);
    return res.end(JSON.stringify({ error: 'Provide city or coordinates' }));
  }

  try {
    const apiRes = await fetch(apiUrl);
    const data = await apiRes.json();
    res.writeHead(apiRes.status);
    res.end(JSON.stringify(data));
  } catch (err) {
    res.writeHead(500);
    res.end(JSON.stringify({ error: err.message }));
  }
});

server.listen(PORT, () => {
  console.log(`✅ Dev API server running at http://localhost:${PORT}`);
  console.log(`   Now run 'npm run dev' in another terminal to start the frontend`);
});