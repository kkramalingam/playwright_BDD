const fs = require('fs');
const path = require('path');

const featuresDir = path.join(__dirname, '..', 'features');
const outDir = path.join(__dirname, '..', '.vscode', 'cucumber-steps');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const stepLines = new Set();
const featureFiles = fs.readdirSync(featuresDir).filter(f => f.endsWith('.feature'));
featureFiles.forEach(file => {
  const content = fs.readFileSync(path.join(featuresDir, file), 'utf8');
  const lines = content.split(/\r?\n/);
  lines.forEach(l => {
    const m = l.trim().match(/^(Given|When|Then|And|But)\s+(.*)$/);
    if (m) stepLines.add(m[2]);
  });
});

const outPath = path.join(outDir, 'editor-steps.js');
const lines = ["const { Given, When, Then } = require('@cucumber/cucumber');", ''];
Array.from(stepLines).sort().forEach(step => {
  // escape backticks and backslashes
  const text = step.replace(/`/g,'\\`').replace(/\\/g,'\\\\');
  lines.push(`Given('${text}', function() { /* editor stub */ });`);
  lines.push(`When('${text}', function() { /* editor stub */ });`);
  lines.push(`Then('${text}', function() { /* editor stub */ });`);
  lines.push('');
});

fs.writeFileSync(outPath, lines.join('\n'));
console.log('Editor steps written to', outPath);
