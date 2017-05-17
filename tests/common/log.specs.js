/* global browser */
/*  File Name : log.specs.js  common test case for check console.log and return index of logs return -1 if no error and index if any severe error   */
export class LogCheck {
  checkLogs (url) {
    browser
        .url(url)
    var logs = browser.log('browser')
    var index = logs.value.map(function (obj) {
      return obj.level
    }).indexOf('SEVERE')
    return index
  }
}
