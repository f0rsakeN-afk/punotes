import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Paths
const PUBLIC_DIR = join(__dirname, '../frontend/public');

// Ensure public directory exists
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

// Generate robots.txt
const robotsTxt = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

# Host
Host: https://punotes.vercel.app

# Sitemaps
`;

// Generate manifest.json
const manifest = {
  "name": "PU Notes",
  "short_name": "PU Notes",
  "description": "Access engineering PDFs, notes, and study materials for Purbanchal University students",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "orientation": "portrait",
  "icons": [
    {
      "src": "../frontend/src/assets/logo.webp",
      "sizes": "192x192",
      "type": "image/webp",
      "purpose": "any maskable"
    },
    {
      "src": "../frontend/src/assets/logo.webp",
      "sizes": "512x512",
      "type": "image/webp",
      "purpose": "any maskable"
    }
  ],
  "shortcuts": [
    {
      "name": "Past Questions",
      "url": "/pastquestions",
      "description": "View past questions"
    },
    {
      "name": "Assignments",
      "url": "/assignments",
      "description": "View assignments"
    }
  ],
  "categories": ["education", "books", "utilities"]
};

try {
  // Write robots.txt
  fs.writeFileSync(
    join(PUBLIC_DIR, 'robots.txt'),
    robotsTxt.trim(),
    'utf8'
  );
  console.log('✅ robots.txt generated successfully');

  // Write manifest.json
  fs.writeFileSync(
    join(PUBLIC_DIR, 'manifest.json'),
    JSON.stringify(manifest, null, 2),
    'utf8'
  );
  console.log('✅ manifest.json generated successfully');

} catch (error) {
  console.error('❌ Error generating meta files:', error);
  process.exit(1);
}