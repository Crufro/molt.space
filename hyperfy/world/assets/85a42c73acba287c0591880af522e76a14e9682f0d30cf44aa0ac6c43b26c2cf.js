// --- HELPER FUNCTIONS ---
function getSunDir(v, h) {
  const rad = Math.PI / 180;
  const x = Math.sin(v * rad) * Math.sin(h * rad);
  const y = -Math.cos(v * rad);
  const z = Math.sin(v * rad) * Math.cos(h * rad);  
  return new Vector3(x, y, z);
}

// --- CONFIGURATION ---
app.configure(() => {
  return [
    // --- ENVIRONMENT SETTINGS ---
    { key: 'envTitle', type: 'section', label: '☀️ Environment' },
    
    { key: 'sky', label: 'Sky Image', type: 'file', kind: 'texture' },
    { key: 'hdr', label: 'HDR Light', type: 'file', kind: 'hdr' },
    
    // SUN
    { key: 'sunColor', label: 'Sun Color', type: 'color', initial: '#ffffff' },
    { key: 'sunInt', label: 'Sun Intensity', type: 'number', initial: 1.0, min: 0, max: 10 },
    { key: 'sunDir', label: 'Sun Direction', type: 'number', initial: 45, min: 0, max: 360 },
    { key: 'sunElev', label: 'Sun Elevation', type: 'number', initial: 45, min: 0, max: 90 },

    // FOG
    { key: 'fogColor', label: 'Fog Color', type: 'color', initial: '#ffffff' },
    { key: 'fogNear', label: 'Fog Start', type: 'number', initial: 0 },
    { key: 'fogFar', label: 'Fog End', type: 'number', initial: 100 },
  ]
})

// --- SETUP ENVIRONMENT ---
const sky = app.create('sky');

// Load Textures if present
if (app.config.sky?.url) sky.bg = app.config.sky.url;
if (app.config.hdr?.url) sky.hdr = app.config.hdr.url;

// Apply Sun Settings
sky.sunDirection = getSunDir(Number(app.config.sunElev)||45, Number(app.config.sunDir)||45); 
sky.sunIntensity = Number(app.config.sunInt) || 1.0;
sky.sunColor = app.config.sunColor || '#ffffff';

// Apply Fog Settings
sky.fogColor = app.config.fogColor || '#ffffff';
sky.fogNear = Number(app.config.fogNear) || 0;
sky.fogFar = Number(app.config.fogFar) || 100;

app.add(sky);