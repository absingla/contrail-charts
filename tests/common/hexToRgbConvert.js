/* global */
/*  File Name : log.specs.js  common test case for check console.log and return index of logs return -1 if no error and index if any severe error   */
export class HexToRgb {
  convert (hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    result = result ? 'rgb(' + parseInt(result[1], 16) + ',' + parseInt(result[2], 16) + ',' + parseInt(result[3], 16) + ')' : null
    return result
  }
}
