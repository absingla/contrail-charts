/* global describe, it, expect */
describe('Testing jasmine on circle CI', function () {
  beforeAll(function (done) {
    //  elusive browser object, I will find where you're defined!
    browser
      .url('http://localhost:9000')  //  in the wdio.config.js I have the base url set to my website.
      .call(done);
  });
  afterAll(function (done) {
    browser.end(done);
  });
  describe('Jasmine Test cases', () => {
    it('jasmine test case to be passed', (done) => {
      expect(1).toBe(1);
      browser.call(done);
    })
  })
});
