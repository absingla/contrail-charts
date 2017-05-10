var assert = require('assert');


describe('localhost:9000', function () {

  beforeAll(function (done) {
    //  elusive browser object, I will find where you're defined!
    browser
      .url('http://localhost:9000')  //  in the wdio.config.js I have the base url set to my website.
      .call(done);
  });
  afterAll(function (done) {
    browser.end(done);
  });


  describe('Juniper Home', function () {
    it('Group Clicked', function (done) {

      browser
        .url('http://localhost:9000');
      var title = browser.getTitle();
      console.log(title);
      expect(title).toBe('Contrail Charts');
      //browser.call(done);
    });
  });

  describe('when a user visits index', function () {
    it('should not have navigation visible', function (done) {
      var opacity = browser.getCssProperty('/html/body/section/div/nav/ul/li[1]', 'opacity');
      expect(opacity.value).toBe(1);
      console.log(opacity);
      browser.call(done);
    });
  });
  describe('when a user clicks the menu button', function () {
    it('should show the navigation', function (done) {
      var opacity = browser.click('/html/body/section/div/nav/ul/li[1]').getCssProperty('/html/body/section/div/nav/ul/li[1]', 'opacity');
      expect(opacity.value).toBe(1);
      console.log(opacity);
      browser.call(done);
    });
    it('should load Grouped Graph when click on Navigation', function (done) {
      var opacity = browser.click('//*[@id="groupedLinks"]/li[1]/a').getCssProperty('//*[@id="cc-stacked-bar-id"]/div', 'opacity');
      expect(opacity.value).toBe(1);
      console.log(opacity);
      browser.call(done);
    });
    it('should not load Navigation Graph when click on line 2 bar', function (done) {
      var opacity = browser.click('//*[@id="groupedLinks"]/li[2]/a');
      var isExisting = browser.isExisting('//*[@id="cc-stacked-bar-id"]/div');
      console.log(isExisting);
      expect(isExisting).toBe(false);
      browser.call(done);
    });
    it('should load line 2 bar Graph when click on line 2 bar', function (done) {
      var opacity = browser.click('//*[@id="groupedLinks"]/li[2]/a');
      var isExisting = browser.isExisting('//*[@id="pie-chart-id-svg-wrapper"]');
      console.log(isExisting);
      expect(isExisting).toBe(true);
      browser.call(done);
    });
  });

});