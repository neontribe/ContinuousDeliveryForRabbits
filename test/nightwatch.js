module.exports = {
  src_folders: ['test/e2e/'],
  output_folder: 'reports',
  custom_commands_path: '',
  custom_assertions_path: '',
  page_objects_path: '',
  globals_path: '',

  selenium: {
    start_process: false,
    server_path: '',
    log_path: '',
    host:'127.0.0.1',
    port: 4444,
    cli_args: {
      'webdriver.chrome.driver': '',
      'webdriver.ie.driver': ''
    }
  },

  test_settings: {
    default: {
      launch_url: 'http://ondemand.saucelabs.com:80',
      selenium_port: 80,
      selenium_host: 'ondemand.saucelabs.com',
      silent: true,
      username: process.env.SAUCE_USERNAME,
      access_key: process.env.SAUCE_ACCESS_KEY,
      screenshots: {
        enabled: false,
        path: ''
      },
      desiredCapabilities: {
        build: 'build-' + process.env.TRAVIS_JOB_NUMBER,
        'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
      }
    },
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        platform: 'OS X 10.11',
        version: '47'
      }
    },
    ie11: {
      desiredCapabilities: {
        browserName: 'internet explorer',
        platform: 'Windows 10',
        version: '11.0'
      }
    }
  }
}
