define([], function () {
  'use strict';
  var plugin = {};
  plugin.config = {
    name: 'bda-radar',
    humanName: 'Bermuda Weather Radar',
    pollInterval: 600
  };

  return plugin;
});