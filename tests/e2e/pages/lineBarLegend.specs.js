/* global describe, it, expect, browser */
import { LogCheck } from '../../common/log.specs.js'
import { HexToRgb } from '../../common/hexToRgbConvert.js'
// describe('Juniper Home test case for lineBarLegend Page', () => {
//   it('Should not any SEVER error in console', (done) => {
//     var newlogCheck = new LogCheck()
//     var logIndex = newlogCheck.checkLogs('http://localhost:9000/#lineBarLegend')
//     expect(logIndex).toBe(-1)
//   })
//   it('Should Change Graph Show Hide By lineBarLegend legend Select By Legend Bar Label A', (done) => {
//     var newHexToRgb = new HexToRgb()
//     if (browser.getValue('[data-accessor="a"] .legend-attribute input') === 'on') {
//       var color = newHexToRgb.convert(browser.getCssProperty('[data-accessor="a"] .legend-attribute .color-indicator', 'background-color').parsed.hex)
//       browser.click('[data-accessor="a"] .legend-attribute')
//       var array = browser.isExisting('#chartBox .svg-wrapper svg .bar-chart rect') ? browser.getAttribute('#chartBox .svg-wrapper svg .bar-chart rect', 'fill') : []
//       var index = array.indexOf(color)
//       expect(index).toBe(-1)
//     }
//     browser.call(done)
//   })
// })


var logCheck = new LogCheck()
logCheck.checkLogs('http://localhost:9000/#lineBarLegend', 'lineBarLegend')
