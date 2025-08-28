// Logo configuration with optimal sizing based on actual file dimensions
// Heights are normalized to 16-28px for readability while fitting in 320px cards
// maxWidth preserves aspect ratios and ensures fit within card width
// scale factor can be used to fine-tune individual logo sizes (default 1.0)
// invert can be set to true for dark logos that need to be inverted to white

export const logoConfig = {
  // WIDE LOGOS (aspect ratio > 4.0) - need smaller heights to fit width
  'osu-text-logo.png': { height: 14, maxWidth: 93 },        // 2560x384 (6.67:1)
  'gradient-logo.png': { height: 20, maxWidth: 127 },        // 5000x785 (6.37:1) - increased size
  'pioneer-logo.png': { height: 22, maxWidth: 94 },         // 5700x1337 (4.26:1) - increased size
  'xeiavp-logo.png': { height: 20, maxWidth: 55 },         
  'xeia-text-logo.png': { height: 20, maxWidth: 60, invert: true },      // Media logo for XeiaVP article - inverted to white
  'prnewswire-text-logo.png': { height: 20, maxWidth: 120 }, // PR Newswire media logo
  'confluent-text-logo.png': { height: 20, maxWidth: 123, scale: 1.15 },  // 1206x196 (6.15:1)
  'endpoint-text-logo.png': { height: 16, maxWidth: 140, invert: true },    // 759x87 (8.72:1)
  'regeneron-text-logo.png': { height: 18, maxWidth: 90 },   // 860x171 (5.03:1)
  'tau-logo.png': { height: 20, maxWidth: 80, scale: 1.15 },             // 400x100 (4.00:1) - scaled up
  
  // EXTRA WIDE (aspect ratio > 3.5)
  'nchroma-text-logo.png': { height: 24, maxWidth: 109 },     // 3334x736 (4.53:1)
  'wharton-text-logo.png': { height: 24, maxWidth: 95, invert: true },     // 864x218 (3.96:1)
  'moderna-text-logo.png': { height: 24, maxWidth: 94 },     // 486x124 (3.92:1)
  'amgen-text-logo.png': { height: 18, maxWidth: 70 },       // 2560x655 (3.91:1)
  'mgen-logo.png': { height: 20, maxWidth: 79 },            // 1478x375 (3.94:1)
  'longitude-text-logo.png': { height: 26, maxWidth: 96 },   // 435x118 (3.69:1)
  'odi-text-logo.png': { height: 22, maxWidth: 80, scale: 1.3 },        // 677x186 (3.64:1)
  'stanford-text-logo.png': { height: 28, maxWidth: 100, invert: true },    // 510x142 (3.59:1)
  'newlimit-text-logo.png': { height: 24, maxWidth: 85 },    // 288x81 (3.56:1)
  'calico-text-logo.png': { height: 20, maxWidth: 74, scale: 0.85 },     // 479x130 (3.68:1)
  
  // STANDARD WIDE (aspect ratio 3.0-3.5)
  'princeton-text-logo.png': { height: 24, maxWidth: 84, invert: true },   // 1901x543 (3.50:1)
  'asbmb-text-logo.png': { height: 20, maxWidth: 68 },      // 876x256 (3.42:1)
  'nature-text-logo.png': { height: 18, maxWidth: 73 },     // 1200x294 (4.08:1)
  'hhmi-text-logo.png': { height: 24, maxWidth: 80, scale: 0.85 },       // 1998x600 (3.33:1)
  'science-logo.png': { height: 20, maxWidth: 73 },         // 1200x330 (3.63:1)
  'usc-text-logo.png': { height: 20, maxWidth: 65, invert: true },        // 1000x309 (3.24:1)
  'humba-logo.png': { height: 20, maxWidth: 62, scale: 1.2 },           // 1920x618 (3.11:1) - scaled up
  'tessera-text-logo.png': { height: 24, maxWidth: 77 },    // 1201x376 (3.19:1)
  'ucb-text-logo.png': { height: 20, maxWidth: 62, invert: true },        // 2346x755 (3.11:1)
  'dyne-text-logo.png': { height: 20, maxWidth: 61 },       // 1065x349 (3.05:1)
  'choma-text-logo.png': { height: 20, maxWidth: 76 },      // 1127x295 (3.82:1)
  'naturerdd-text-logo.png': { height: 20, maxWidth: 60 },  // 1143x379 (3.02:1)
  'naturebiotech-text-logo.png': { height: 20, maxWidth: 60 }, // 2000x669 (2.99:1)
  
  // MEDIUM ASPECT (2.5-3.0)
  'google-text-logo.png': { height: 24, maxWidth: 71 },     // 1200x406 (2.96:1)
  'upenn-text-logo.png': { height: 32, maxWidth: 92, scale: 0.9, invert: true },      // 1450x507 (2.86:1)
  'uoft-text-logo.png': { height: 32, maxWidth: 90, invert: true },       // 2309x821 (2.81:1)
  'rnati-logo.png': { height: 36, maxWidth: 97 },           // 822x304 (2.70:1)
  'pnas-logo.png': { height: 20, maxWidth: 54 },            // 1024x379 (2.70:1)
  'sarepta-text-logo.png': { height: 32, maxWidth: 85, invert: true },    // 812x307 (2.64:1)
  'ucla-text-logo.png': { height: 22, maxWidth: 58, scale: 0.85},       // 1048x398 (2.63:1)
  
  // COMPACT ASPECT (< 2.5) but actually wide
  'jpm-logo.png': { height: 18, maxWidth: 88, invert: true },             // 2400x493 (4.87:1)
  'cell-logo.png': { height: 20, maxWidth: 108 },           // 735x136 (5.40:1) - increased size
  'csh-text-logo.png': { height: 24, maxWidth: 137 },       // 1386x242 (5.72:1) - increased more
  'caltech-text-logo.png': { height: 20, maxWidth: 82 },    // 1524x373 (4.09:1)
  
  // COMPACT ASPECT
  'ucsf-text-logo.png': { height: 24, maxWidth: 49, scale: 0.85 },       // 2560x1249 (2.05:1)
  'dg-logo.png': { height: 44, maxWidth: 88, scale: 1.2 },              // 1024x512 (2.00:1)
  'mcmaster-text-logo.png': { height: 20, maxWidth: 36 },   // 1200x665 (1.80:1)
  
  // SQUARE-ISH
  'umc-text-logo.png': { height: 40, maxWidth: 53, scale: 0.9, invert: false },        // 2701x2053 (1.32:1)
  'nas-text-logo.png': { height: 40, maxWidth: 48, invert: true },        // 1200x996 (1.20:1)
};

// Default configuration for any missing logos
export const defaultLogoConfig = { height: 24, maxWidth: 85, scale: 1.0 };