define(['require', './admin'], function (require) {
  'use strict';
  var plugin = require('./admin'),
      localScreen = function () {
        var self = this;
        return {
          getViewData: function () {
            return {
              url: self.props.data.url,
              forcefull: self.props.data.forcefull,
              wrapclass: self.props.data.forcefull ? 'force-fullscreen' : 'img-wrapper',
              caption: null
            };
          }
        };
      };

  localScreen.config = plugin.config;
  return localScreen;
});