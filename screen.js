define(['boards/data-loader', 'require', './admin'], function (dataLoader, require) {
  'use strict';
  var plugin = require('./admin'),
      localScreen = function ($) {
        var self = this,
            findServerProxy = function () {
              if (self.globalConfig && self.globalConfig.externalProxy) {
                return self.globalConfig.externalProxy.host + ':' + self.globalConfig.externalProxy.port;
              }
              return false;
            },
            makeRequest = function () {
              var url = 'www.weather.bm/radarLarge.asp';
              return dataLoader({
                url: url,
                dataType: 'html',
                proxy: true,
                serverProxy: findServerProxy(),
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
            var timer;
            self.animindex = self.animindex || 0;
            if (self.props.data.animate && !self.animating) {
              self.animating = true;
              timer = setInterval(function () {
                if (!self.$screen || !self.$screen.is(':visible')) {
                  self.animating = false;
                  clearInterval(timer);
                  return;
                }
                if (self.animindex >= 9) {
                  if (self.animindex === 13) {
                    self.animindex = -1;
                  } else {
                    self.animindex += 1;
                    return;
                  }
                }
                self.animindex += 1;
                self.$screen.find('.radar-img img').hide().filter('#Img_' + self.animindex).show();
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