/* global describe, it, expect */
import { LogCheck } from '../../common/log.specs.js'
describe('Juniper Home test case for lineBarStackedBar Page', () => {
  it('Should not any SEVER error in console', (done) => {
    var newlogCheck = new LogCheck()
    var logIndex = newlogCheck.checkLogs('http://localhost:9000/#lineBarStackedBar')
    expect(logIndex).toBe(-1)
  })
})
