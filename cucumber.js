const browserName = process.env.BROWSER || 'msedge';

const common = {
  requireModule: ['ts-node/register'],
  require: [
    'step_definitions/**/*.ts',
    'hooks/**/*.ts'
  ],
  format: [
    'progress',
    'summary',
    'json:reports/cucumber-report.json',
    'html:reports/cucumber-report.html',
    'allure-cucumberjs/reporter'
  ],
  formatOptions: {
    snippetInterface: 'async-await'
  }
};

const isDryRun = process.argv.includes('--dry-run');

if (isDryRun) {
  common.format = ['progress'];
}


module.exports = {
  chrome: {
    ...common,
    worldParameters: {
      browser: 'chrome'
    }
  },
  msedge: {
    ...common,
    worldParameters: {
      browser: 'msedge'
    }
  },
  firefox: {
    ...common,
    worldParameters: {
      browser: 'firefox'
    }
  },
  webkit: {
    ...common,
    worldParameters: {
      browser: 'webkit'
    }
  },
  default: {
    ...common,
    worldParameters: {
      browser: browserName
    }
  }
};
