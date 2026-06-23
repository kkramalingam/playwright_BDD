// Editor helper: re-export generated editor-only step stubs so extensions scanning
// step_definitions/**/*.js can discover them for Go-To-Definition and hover.
try {
  module.exports = require('../.vscode/cucumber-steps/editor-steps.js');
} catch (e) {
  // if the generated file is missing or cannot be loaded, ignore silently
}
