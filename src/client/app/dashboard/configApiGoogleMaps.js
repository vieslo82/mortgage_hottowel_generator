(function() {
  'use strict';

  var dashboard = angular.module('app.dashboard');

  //Google maps configuration
  dashboard.config(function(uiGmapGoogleMapApiProvider) {
      uiGmapGoogleMapApiProvider.configure({
          key: 'AIzaSyA6b-K_LzG0Lt3OPmwbxlYe1FW67CXbrPY',
          v: '3.26', //defaults to latest 3.X anyhow
          libraries: 'weather,geometry,visualization'
      });
  });

})();
