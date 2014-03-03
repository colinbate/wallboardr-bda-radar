define(['boards/data-loader', 'require', './admin'], function (dataLoader, require) {
  'use strict';
  var plugin = require('./admin'),
      localScreen = function ($) {
        var self = this,
            makeRequest = function (url, data) {
              url = 'www.weather.bm/radarLarge.asp';
              return dataLoader({
                url: url,
                dataType: 'html',
                proxy: true,
                filter: function (page) {
                  var $radarDiv = $(page).find('.RadarImage');
                  $radarDiv.find('img').attr('src', function (i, val) {
                    return 'http://www.weather.bm' + val;
                  }).removeAttr('width').removeAttr('height');
                  return $radarDiv.html();
                }
              });
            };

        return {
          postShow: function () {
            var timer, index = 0;
            if (self.props.data.animate && !self.animating) {
              self.animating = true;
              timer = setInterval(function () {
                var ts;
                if (!self.$screen.is(':visible')) {
                  self.animating = false;
                  clearInterval(timer);
                  return;
                }
                if (index >= 9) {
                  if (index === 13) {
                    index = -1;
                  } else {
                    index += 1;
                    return;
                  }
                }
                index += 1;
                self.$screen.find('.radar-img img').hide().filter('#Img_' + index).show();
              }, 800);

            }
          },
          getViewData: function () {
            return makeRequest().then(function (frag) {
              return {
                imgs: frag,
                bgcolor: '#10105D',
                wrapclass: 'img-wrapper'
              };
            });
          }
        };
      };

  localScreen.config = plugin.config;
  return localScreen;
});