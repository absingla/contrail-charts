var assert = require('assert');

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result = result ? 'rgb(' + parseInt(result[1], 16) + ',' + parseInt(result[2], 16) + ',' + parseInt(result[3], 16) + ')' : null;
}

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
    it('Should Web Title is Contrail Charts', function (done) {
      browser
        .url('http://localhost:9000');
      var title = browser.getTitle();
      console.log(title);
      expect(title).toBe('Contrail Charts');
      //browser.call(done);
    });
  });

  describe('when a user clicks the Group Link', function () {
    it('should show the Group Menu', function (done) {
      var opacity;
      browser.click('.nav-sidebar__hassub a .icon-chart-group');
      browser.waitUntil(function () {
        opacity = browser.getAttribute('.nav-sidebar__hassub #groupedLinks', 'aria-expanded');
        return opacity === 'true'
      }, 1000);
      expect(opacity).toBe('true');
      browser.call(done);
    });
    it('Should Change Header Text Value Equal to Menu Text Navigation By Select groupedNavigation', function (done) {
      var pageTitle, linkText;
      browser.click('.groupedNavigation');
      linkText = browser.getText('.groupedNavigation');
      pageTitle = browser.getText('#page-title');
      expect(pageTitle).toBe(linkText);
      browser.call(done);
    });
    it('Should Not Get Any Console error Log On browser Winodw By Select groupedNavigation', function (done) {
      var pageTitle, linkText;
      browser.click('.groupedNavigation');
      var logs = browser.log('browser');
      var index = logs.value.map(function (obj) {
        return obj.level;
      }).indexOf('SEVERE');
      expect(index).toBe(-1);
      browser.call(done);
    });
    it('Should Change Header Text Value Equal to Menu Text Navigation By Select grouped2LineBar1PieNav', function (done) {
      var pageTitle, linkText;
      browser.click('.grouped2LineBar1PieNav');
      linkText = browser.getText('.grouped2LineBar1PieNav');
      pageTitle = browser.getText('#page-title');
      expect(pageTitle).toBe(linkText);
      browser.call(done);
    });
    it('Should Not Get Any Console error Log On browser Winodw By Select grouped2LineBar1PieNav', function (done) {
      var pageTitle, linkText;
      browser.click('.grouped2LineBar1PieNav');
      var logs = browser.log('browser');
      var index = logs.value.map(function (obj) {
        return obj.level;
      }).indexOf('SEVERE');
      expect(index).toBe(-1);
      browser.call(done);
    });
    it('should closed the Group Menu', function (done) {
      var opacity;
      browser.click('.nav-sidebar__hassub a .icon-chart-group');
      browser.waitUntil(function () {
        opacity = browser.getAttribute('.nav-sidebar__hassub #groupedLinks', 'aria-expanded');
        return opacity === 'false'
      }, 1000);
      expect(opacity).toBe('false');
      browser.call(done);
    });
  });

  describe('when a user clicks the Line Bar Link', function () {
    it('should show the navigation', function (done) {
      var opacity;
      browser.click('.nav-sidebar__hassub a .icon-chart-line');
      browser.waitUntil(function () {
        opacity = browser.getAttribute('.nav-sidebar__hassub #lineBarLinks', 'aria-expanded');
        return opacity === 'true'
      }, 1000);
      expect(opacity).toBe('true');
      browser.call(done);
    });
    it('Should Get Bar Chart By Select lineBarLegend', function (done) {
      var pageTitle, linkText;
      browser.click('.lineBarLegend');
      linkText = browser.getText('.lineBarLegend');
      pageTitle = browser.getText('#page-title');
      browser.getAttribute('#chartBox .svg-wrapper svg .bar-chart', 'aria-expanded');
      expect(browser.isExisting('#chartBox .svg-wrapper svg .bar-chart') && browser.isExisting('#chartBox .legend-panel') && browser.isExisting('#chartBox .control-panel') && browser.isExisting('#chartBox .navigation')).toBe(true);
      expect(pageTitle).toBe(linkText);
      browser.call(done);
    });

    it('Should Change Graph Show Hide By lineBarLegend legend Select By Legend Bar Label A', function (done) {
      if (browser.getValue('[data-accessor="a"] .legend-attribute input') === 'on') {
        var color = hexToRgb(browser.getCssProperty('[data-accessor="a"] .legend-attribute .color-indicator', 'background-color').parsed.hex);
        browser.click('[data-accessor="a"] .legend-attribute');
        var array = browser.isExisting('#chartBox .svg-wrapper svg .bar-chart rect') ? browser.getAttribute('#chartBox .svg-wrapper svg .bar-chart rect', 'fill') : [];
        var index = array.indexOf(color);
        expect(index).toBe(-1);
      }

      browser.call(done);
    });
    it('Should Change Graph Show Hide By lineBarLegend legend Select By Legend Bar Label A', function (done) {
      if (browser.getValue('[data-accessor="a"] .legend-attribute input') === undefined) {
        var color = hexToRgb(browser.getCssProperty('[data-accessor="a"] .legend-attribute .color-indicator', 'background-color').parsed.hex);
        browser.click('[data-accessor="a"] .legend-attribute');
        var array = browser.isExisting('#chartBox .svg-wrapper svg .bar-chart rect') ? browser.getAttribute('#chartBox .svg-wrapper svg .bar-chart rect', 'fill') : [];
        var index = array.indexOf(color);
        expect(index).not.toBe(-1);
      }
      browser.call(done);
    });

    it('Should Change Graph Show Hide By lineBarLegend legend Select By Legend Bar Label B False', function (done) {
      if (browser.getValue('[data-accessor="b"] .legend-attribute input') === 'on') {
        var color = hexToRgb(browser.getCssProperty('[data-accessor="b"] .legend-attribute .color-indicator', 'background-color').parsed.hex);
        browser.click('[data-accessor="b"] .legend-attribute');
        var array = browser.isExisting('#chartBox .svg-wrapper svg .bar-chart rect') ? browser.getAttribute('#chartBox .svg-wrapper svg .bar-chart rect', 'fill') : [];
        console.log('=======================================================================================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', array);
        var index = array.indexOf(color);
        expect(index).toBe(-1);
      }
      browser.call(done);
    });
    it('Should Change Graph Show Hide By lineBarLegend legend Select By Legend Bar Label B', function (done) {
      if (browser.getValue('[data-accessor="b"] .legend-attribute input') === undefined) {
        var color = hexToRgb(browser.getCssProperty('[data-accessor="b"] .legend-attribute .color-indicator', 'background-color').parsed.hex);
        browser.click('[data-accessor="b"] .legend-attribute');
        var array = browser.isExisting('#chartBox .svg-wrapper svg .bar-chart rect') ? browser.getAttribute('#chartBox .svg-wrapper svg .bar-chart rect', 'fill') : [];
        console.log('=======================================================================================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', array);
        var index = array.indexOf(color);
        expect(index).not.toBe(-1);
      }
      browser.call(done);
    });

    it('Should Change Graph Show Hide By lineBarLegend legend Select By Legend Bar Label C', function (done) {
      if (browser.getValue('[data-accessor="c"] .legend-attribute input') === undefined) {
        var color = hexToRgb(browser.getCssProperty('[data-accessor="c"] .legend-attribute .color-indicator', 'background-color').parsed.hex);
        browser.click('[data-accessor="c"] .legend-attribute');
        var array = browser.isExisting('#chartBox .svg-wrapper svg .bar-chart rect') ? browser.getAttribute('#chartBox .svg-wrapper svg .bar-chart rect', 'fill') : [];
        var index = array.indexOf(color);
        expect(index).not.toBe(-1);
      }
      browser.call(done);
    });
    it('Should Change Graph Show Hide By lineBarLegend legend Select By Legend Bar Label C', function (done) {
      if (browser.getValue('[data-accessor="c"] .legend-attribute input') === 'on') {
        var color = hexToRgb(browser.getCssProperty('[data-accessor="c"] .legend-attribute .color-indicator', 'background-color').parsed.hex);
        browser.click('[data-accessor="c"] .legend-attribute');
        var array = browser.isExisting('#chartBox .svg-wrapper svg .bar-chart rect') ? browser.getAttribute('#chartBox .svg-wrapper svg .bar-chart rect', 'fill') : [];
        var index = array.indexOf(color);
        expect(index).toBe(-1);
      }
      browser.call(done);
    });

    it('Should Change Graph Show Hide By lineBarLegend legend Select By Legend Bar Label D False', function (done) {
      if (browser.getValue('[data-accessor="d"] .legend-attribute input') === 'on') {
        var color = hexToRgb(browser.getCssProperty('[data-accessor="d"] .legend-attribute .color-indicator', 'background-color').parsed.hex);
        browser.click('[data-accessor="d"] .legend-attribute');
        expect(browser.isExisting('#chartBox .svg-wrapper svg .line-chart .line-d')).toBe(false);
      }

      browser.call(done);
    });
    it('Should Change Graph Show Hide By lineBarLegend legend Select By Legend Bar Label D', function (done) {
      if (browser.getValue('[data-accessor="d"] .legend-attribute input') === undefined) {
        var color = hexToRgb(browser.getCssProperty('[data-accessor="d"] .legend-attribute .color-indicator', 'background-color').parsed.hex);
        browser.click('[data-accessor="d"] .legend-attribute');
        expect(browser.isExisting('#chartBox .svg-wrapper svg .line-chart .line-d')).toBe(true);
      }
      browser.call(done);
    });

    it('Should Change Graph Show Hide By lineBarLegend legend Select By Legend Bar Label E', function (done) {
      if (browser.getValue('[data-accessor="e"] .legend-attribute input') === 'on') {
        var color = hexToRgb(browser.getCssProperty('[data-accessor="e"] .legend-attribute .color-indicator', 'background-color').parsed.hex);
        browser.click('[data-accessor="e"] .legend-attribute');
        browser.click('[data-accessor="d"] .legend-attribute');
        expect(browser.isExisting('#chartBox .svg-wrapper svg .line-chart .line-e')).toBe(false);
      }

      browser.call(done);
    });
    it('Should Change Graph Show Hide By lineBarLegend legend Select By Legend Bar Label E', function (done) {
      if (browser.getValue('[data-accessor="e"] .legend-attribute input') === undefined) {
        var color = hexToRgb(browser.getCssProperty('[data-accessor="e"] .legend-attribute .color-indicator', 'background-color').parsed.hex);
        browser.click('[data-accessor="d"] .legend-attribute');
        expect(browser.isExisting('#chartBox .svg-wrapper svg .line-chart .line-e')).toBe(true);
      }
      browser.call(done);
    });
    it('Select Color By Label A', function (done) {
      if (browser.getValue('[data-accessor="e"] .legend-attribute input') === undefined)
        browser.click('[data-accessor="a"] .legend-attribute');
      browser.click('.edit-legend');
      browser.click('[data-accessor="a"] .select--color');
      browser.click('.switches--colors [data-color="#9edae5"]');
      var color = hexToRgb('#9edae5');
      var array = browser.isExisting('#chartBox .svg-wrapper svg .bar-chart rect') ? browser.getAttribute('#chartBox .svg-wrapper svg .bar-chart rect', 'fill') : [];
      var index = array.indexOf(color);
      expect(index).toBe(-1);
      // var color = hexToRgb(browser.getCssProperty('[data-accessor="e"] .legend-attribute .color-indicator', 'background-color').parsed.hex);
      // browser.click('[data-accessor="d"] .legend-attribute');
      // expect(browser.isExisting('#chartBox .svg-wrapper svg .line-chart .line-e')).toBe(true);

      browser.call(done);
    });


    it('Should Not Get Any Console error Log On browser Winodw By Select lineBarLegend', function (done) {
      var pageTitle, linkText;
      browser.click('.lineBarLegend');
      var logs = browser.log('browser');
      var index = logs.value.map(function (obj) {
        return obj.level;
      }).indexOf('SEVERE');
      expect(index).toBe(-1);
      browser.call(done);
    });
    it('Should Change Header Text Value Equal to Menu Text Navigation By Select lineBarControls', function (done) {
      var pageTitle, linkText;
      browser.click('.lineBarControls');
      linkText = browser.getText('.lineBarControls');
      pageTitle = browser.getText('#page-title');
      expect(pageTitle).toBe(linkText);
      browser.call(done);
    });
    it('Should Not Get Any Console error Log On browser Winodw By Select lineBarControls', function (done) {
      var pageTitle, linkText;
      browser.click('.lineBarControls');
      var logs = browser.log('browser');
      var index = logs.value.map(function (obj) {
        return obj.level;
      }).indexOf('SEVERE');
      console.log('=============================================================================', logs.value.length)
      expect(index).toBe(-1);
      browser.call(done);
    });
    it('Should Change Header Text Value Equal to Menu Text Navigation By Select lineBarTimeline', function (done) {
      var pageTitle, linkText;
      browser.click('.lineBarTimeline');
      linkText = browser.getText('.lineBarTimeline');
      pageTitle = browser.getText('#page-title');
      expect(pageTitle).toBe(linkText);
      browser.call(done);
    });
    it('Should Not Get Any Console error Log On browser Winodw By Select lineBarTimeline', function (done) {
      var pageTitle, linkText;
      browser.click('.lineBarTimeline');
      var logs = browser.log('browser');
      var index = logs.value.map(function (obj) {
        return obj.level;
      }).indexOf('SEVERE');
      expect(index).toBe(-1);
      console.log('=============================================================================', logs.value.length)
      browser.call(done);
    });
    it('Should Change Header Text Value Equal to Menu Text Navigation By Select lineBarTooltips', function (done) {
      var pageTitle, linkText;
      browser.click('.lineBarTooltips');
      linkText = browser.getText('.lineBarTooltips');
      pageTitle = browser.getText('#page-title');
      expect(pageTitle).toBe(linkText);
      browser.call(done);
    });
    it('Should Not Get Any Console error Log On browser Winodw By Select lineBarTooltips', function (done) {
      var pageTitle, linkText;
      browser.click('.lineBarTooltips');
      var logs = browser.log('browser');
      var index = logs.value.map(function (obj) {
        return obj.level;
      }).indexOf('SEVERE');
      expect(index).toBe(-1);
      console.log('=============================================================================', logs.value.length)
      browser.call(done);
    });
    it('Should Change Header Text Value Equal to Menu Text Navigation By Select lineBarGroupedBar', function (done) {
      var pageTitle, linkText;
      browser.click('.lineBarGroupedBar');
      linkText = browser.getText('.lineBarGroupedBar');
      pageTitle = browser.getText('#page-title');
      expect(pageTitle).toBe(linkText);
      browser.call(done);
    });
    it('Should Change Header Text Value Equal to Menu Text Navigation By Select lineBarRequireJS', function (done) {
      var pageTitle, linkText;
      browser.click('.lineBarRequireJS');
      linkText = browser.getText('.lineBarRequireJS');
      pageTitle = browser.getText('#page-title');
      expect(pageTitle).toBe(linkText);
      browser.call(done);
    });
    it('Should Not Get Any Console error Log On browser Winodw By Select lineBarGroupedBar', function (done) {
      var pageTitle, linkText;
      browser.click('.lineBarGroupedBar');
      var logs = browser.log('browser');
      var index = logs.value.map(function (obj) {
        return obj.level;
      }).indexOf('SEVERE');
      expect(index).toBe(-1);
      console.log('=============================================================================', logs.value.length)
      browser.call(done);
    });
    it('Should Not Get Any Console error Log On browser Winodw By Select lineBarRequireJS', function (done) {
      var pageTitle, linkText;
      browser.click('.lineBarRequireJS');
      var logs = browser.log('browser');
      var index = logs.value.map(function (obj) {
        return obj.level;
      }).indexOf('SEVERE');
      expect(index).toBe(-1);
      browser.call(done);
    });
    it('Should Change Header Text Value Equal to Menu Text Navigation By Select lineBarLiveData', function (done) {
      var pageTitle, linkText;
      browser.click('.lineBarLiveData');
      linkText = browser.getText('.lineBarLiveData');
      pageTitle = browser.getText('#page-title');
      expect(pageTitle).toBe(linkText);
      browser.call(done);
    });
    it('Should Not Get Any Console error Log On browser Winodw By Select lineBarLiveData', function (done) {
      var pageTitle, linkText;
      browser.click('.lineBarLiveData');
      var logs = browser.log('browser');
      var index = logs.value.map(function (obj) {
        return obj.level;
      }).indexOf('SEVERE');
      expect(index).toBe(-1);
      browser.call(done);
    });
    it('Should Change Header Text Value Equal to Menu Text Navigation By Select lineBarStackedBar', function (done) {
      var pageTitle, linkText;
      browser.click('.lineBarStackedBar');
      linkText = browser.getText('.lineBarStackedBar');
      pageTitle = browser.getText('#page-title');
      expect(pageTitle).toBe(linkText);
      browser.call(done);
    });
    it('Should Not Get Any Console error Log On browser Winodw By Select lineBarStackedBar', function (done) {
      var pageTitle, linkText;
      browser.click('.lineBarStackedBar');
      var logs = browser.log('browser');
      var index = logs.value.map(function (obj) {
        return obj.level;
      }).indexOf('SEVERE');
      expect(index).toBe(-1);
      browser.call(done);
    });
    it('should closed the Line Bar', function (done) {
      var opacity;
      browser.click('.nav-sidebar__hassub a .icon-chart-line');
      browser.waitUntil(function () {
        opacity = browser.getAttribute('.nav-sidebar__hassub #lineBarLinks', 'aria-expanded');
        return opacity === 'false'
      }, 1000);
      expect(opacity).toBe('false');
      browser.call(done);
    });
  });

  describe('when a user clicks the Bubble', function () {
    it('should show the Bubble Menu', function (done) {
      var opacity;
      browser.click('.nav-sidebar__hassub a .icon-chart-bubble');
      browser.waitUntil(function () {
        opacity = browser.getAttribute('.nav-sidebar__hassub #bubbleLinks', 'aria-expanded');
        return opacity === 'true'
      }, 1000);
      expect(opacity).toBe('true');
      browser.call(done);
    });
    it('Should Change Header Text Value Equal to Menu Text Navigation By Select bubbleShapes', function (done) {
      var pageTitle, linkText;
      browser.click('.bubbleShapes');
      linkText = browser.getText('.bubbleShapes');
      pageTitle = browser.getText('#page-title');
      expect(pageTitle).toBe(linkText);
      browser.call(done);
    });
    it('Should Not Get Any Console error Log On browser Winodw By Select bubbleShapes', function (done) {
      var pageTitle, linkText;
      browser.click('.bubbleShapes');
      var logs = browser.log('browser');
      var index = logs.value.map(function (obj) {
        return obj.level;
      }).indexOf('SEVERE');
      expect(index).toBe(-1);
      browser.call(done);
    });
    it('Should Change Header Text Value Equal to Menu Text Navigation By Select bubbleMap', function (done) {
      var pageTitle, linkText;
      browser.click('.bubbleMap');
      linkText = browser.getText('.bubbleMap');
      pageTitle = browser.getText('#page-title');
      expect(pageTitle).toBe(linkText);
      browser.call(done);
    });
    it('Should Not Get Any Console error Log On browser Winodw By Select bubbleMap', function (done) {
      var pageTitle, linkText;
      browser.click('.bubbleMap');
      var logs = browser.log('browser');
      var index = logs.value.map(function (obj) {
        return obj.level;
      }).indexOf('SEVERE');
      expect(index).toBe(-1);
      browser.call(done);
    });
    it('should closed the Bubble', function (done) {
      var opacity;
      browser.click('.nav-sidebar__hassub a .icon-chart-bubble');
      browser.waitUntil(function () {
        opacity = browser.getAttribute('.nav-sidebar__hassub #bubbleLinks', 'aria-expanded');
        return opacity === 'false'
      }, 1000);
      expect(opacity).toBe('false');
      browser.call(done);
    });
  });

  describe('when a user clicks the radial Link', function () {
    it('should show the radial Menu', function (done) {
      var opacity;
      browser.click('.nav-sidebar__hassub a .icon-chart-radial');
      browser.waitUntil(function () {
        opacity = browser.getAttribute('.nav-sidebar__hassub #radialLinks', 'aria-expanded');
        return opacity === 'true'
      }, 1000);
      expect(opacity).toBe('true');
      browser.call(done);
    });
    it('Should Change Header Text Value Equal to Menu Text Navigation By Select radialPieChart', function (done) {
      var pageTitle, linkText;
      browser.click('.radialPieChart');
      linkText = browser.getText('.radialPieChart');
      pageTitle = browser.getText('#page-title');
      expect(pageTitle).toBe(linkText);
      browser.call(done);
    });
    it('Should Not Get Any Console error Log On browser Winodw By Select radialPieChart', function (done) {
      var pageTitle, linkText;
      browser.click('.radialPieChart');
      var logs = browser.log('browser');
      var index = logs.value.map(function (obj) {
        return obj.level;
      }).indexOf('SEVERE');
      expect(index).toBe(-1);
      browser.call(done);
    });
    it('Should Change Header Text Value Equal to Menu Text Navigation By Select radialDendrogram', function (done) {
      var pageTitle, linkText;
      browser.click('.radialDendrogram');
      linkText = browser.getText('.radialDendrogram');
      pageTitle = browser.getText('#page-title');
      expect(pageTitle).toBe(linkText);
      browser.call(done);
    });
    it('Should Not Get Any Console error Log On browser Winodw By Select radialDendrogram', function (done) {
      var pageTitle, linkText;
      browser.click('.radialDendrogram');
      var logs = browser.log('browser');
      var index = logs.value.map(function (obj) {
        return obj.level;
      }).indexOf('SEVERE');
      expect(index).toBe(-1);
      browser.call(done);
    });
    it('should closed the radial Menu', function (done) {
      var opacity;
      browser.click('.nav-sidebar__hassub a .icon-chart-radial');
      browser.waitUntil(function () {
        opacity = browser.getAttribute('.nav-sidebar__hassub #radialLinks', 'aria-expanded');
        return opacity === 'false'
      }, 1000);
      expect(opacity).toBe('false');
      browser.call(done);
    });
  });

  describe('when a user clicks the area Link', function () {
    it('should show the area Menu', function (done) {
      var opacity;
      browser.click('.nav-sidebar__hassub a .icon-chart-area');
      browser.waitUntil(function () {
        opacity = browser.getAttribute('.nav-sidebar__hassub #areaLinks', 'aria-expanded');
        return opacity === 'true'
      }, 1000);
      expect(opacity).toBe('true');
      browser.call(done);
    });
    it('Should Change Header Text Value Equal to Menu Text Navigation By Select areaBasic', function (done) {
      var pageTitle, linkText;
      browser.click('.areaBasic');
      linkText = browser.getText('.areaBasic');
      pageTitle = browser.getText('#page-title');
      expect(pageTitle).toBe(linkText);
      browser.call(done);
    });
    it('Should Not Get Any Console error Log On browser Winodw By Select areaBasic', function (done) {
      var pageTitle, linkText;
      browser.click('.areaBasic');
      var logs = browser.log('browser');
      var index = logs.value.map(function (obj) {
        return obj.level;
      }).indexOf('SEVERE');
      expect(index).toBe(-1);
      browser.call(done);
    });
    it('should closed the area Menu', function (done) {
      var opacity;
      browser.click('.nav-sidebar__hassub a .icon-chart-area');
      browser.waitUntil(function () {
        opacity = browser.getAttribute('.nav-sidebar__hassub #areaLinks', 'aria-expanded');
        return opacity === 'false'
      }, 1000);
      expect(opacity).toBe('false');
      browser.call(done);
    });
  });

  describe('when a user clicks the advance Link', function () {
    it('should show the area Menu', function (done) {
      var opacity;
      browser.click('.nav-sidebar__hassub a .icon-chart-advanced');
      browser.waitUntil(function () {
        opacity = browser.getAttribute('.nav-sidebar__hassub #advanceLinks', 'aria-expanded');
        return opacity === 'true'
      }, 1000);
      expect(opacity).toBe('true');
      browser.call(done);
    });
    it('Should Change Header Text Value Equal to Menu Text Navigation By Select advanceSankey', function (done) {
      var pageTitle, linkText;
      browser.click('.advanceSankey');
      linkText = browser.getText('.advanceSankey');
      pageTitle = browser.getText('#page-title');
      expect(pageTitle).toBe(linkText);
      browser.call(done);
    });

    it('should closed the advanced Menu', function (done) {
      var opacity;
      browser.click('.nav-sidebar__hassub a .icon-chart-advanced');
      browser.waitUntil(function () {
        opacity = browser.getAttribute('.nav-sidebar__hassub #advanceLinks', 'aria-expanded');
        return opacity === 'false'
      }, 1000);
      expect(opacity).toBe('false');
      browser.call(done);
    });
  });

});