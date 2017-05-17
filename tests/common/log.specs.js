/* global browser */
/*  File Name : log.specs.js  common test case for check console.log and return index of logs return -1 if no error and index if any severe error   */
export class LogCheck {
  checkLogs(url, page_params) {
    describe('Juniper Home test case for ' + page_params + ' Page ', () => {
      it('Should not show any SEVER error in console', (done) => {
        browser
          .url(url)
        var logs = browser.log('browser')
        var index = logs.value.map(function (obj) {
          return obj.level
        }).indexOf('SEVERE')
        expect(index).toBe(-1)
      })
    })
  }
}
