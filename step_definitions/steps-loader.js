// Helper loader for editor extensions: register ts-node and require all .ts step definition files
try {
  require('ts-node/register');
} catch (e) {
  // ts-node may not be installed in some environments; ignore silently
}

const fs = require('fs');
const path = require('path');

const dir = __dirname;
fs.readdirSync(dir)
  .filter((f) => f.endsWith('.ts'))
  .forEach((file) => {
    try {
      require(path.join(dir, file));
    } catch (err) {
      // ignore errors when loading for editor discovery
    }
  });

module.exports = {};
