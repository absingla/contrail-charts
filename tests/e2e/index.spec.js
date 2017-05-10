var assert = require('assert');


describe('localhost:9000', function() {

beforeAll(function (done) {
    //  elusive browser object, I will find where you're defined!
    browser
      .url('http://localhost:9000')  //  in the wdio.config.js I have the base url set to my website.
      .call(done);
  });


describe('Juniper Home', function () {
   it('Group Clicked', function (done) {

   browser
        .url('http://localhost:9000')
        .getTitle().then(function (title) {
          expect(title).toBe('Wingify');
        }).call(done);
   });
});

});