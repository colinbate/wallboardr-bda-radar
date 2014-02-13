define(['require', './admin'], function (require) {
  'use strict';
  var plugin = require('./admin'),
      localScreen = function ($) {
        var self = this,
            padLeft = function (val, width, padWith) {
              width = width || 2;
              padWith = padWith || '0';
              val = '' + val;
              while (val.length < width) {
                val = padWith + val;
              }
              return val;
            },
            formatRadarTime = function (date) {
              var d = date.getFullYear() + '-' + padLeft(date.getMonth() + 1) + '-' + padLeft(date.getDate()),
                  t = padLeft(date.getHours()) + padLeft(date.getMinutes());
              return d + '-' + t;
            },
            getNthLastRadarTime = function (n) {
              var now = new Date(),
                  nth = now.getMinutes() - (n * 10);
              nth = Math.floor((nth - 5) / 10) * 10 + 3;
              now.setMinutes(nth);
              return formatRadarTime(now);
            },
            getRadarUrl = function (stamp) {
              return 'http://www.weather.bm/images/radarImagery2/westatlantic-radar-' + stamp + '.png';
            };

        return {
          postShow: function () {
            var timer, index = 9;
            if (self.props.data.animate && !self.animating) {
              self.animating = true;
              timer = setInterval(function () {
                var ts;
                if (!self.$screen.is(':visible')) {
                  self.animating = false;
                  clearInterval(timer);
                  return;
                }
                if (index < 0) {
                  if (index === -4) {
                    index = 9;
                  } else {
                    index -= 1;
                    return;
                  }
                }
                ts = getNthLastRadarTime(index);
                index -= 1;
                self.$screen.find('.radar-img').css({'background-image': 'url(' + getRadarUrl(ts) + ')'});
              }, 800);

            }
          },
          getViewData: function () {
            var timestamp = getNthLastRadarTime(0);
            return {
              url: getRadarUrl(timestamp),
              bgcolor: '#10105D',
              forcefull: true,
              wrapclass: 'force-fullscreen',
              caption: null
            };
          }
        };
      };

  localScreen.config = plugin.config;
  return localScreen;
});