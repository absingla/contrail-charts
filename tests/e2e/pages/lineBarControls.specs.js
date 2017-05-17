/* global describe, it, expect */
import { LogCheck } from '../../common/log.specs.js'
describe('Juniper Home test case for lineBarControls Page', () => {
  it('Should not any SEVER error in console', (done) => {
    var logCheck = new LogCheck()
    var index = logCheck.checkLogs('http://localhost:9000/#lineBarControls', 'lineBarControls')
    expect(index).toBe(-1)
  })
})


