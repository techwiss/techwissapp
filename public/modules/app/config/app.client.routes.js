'use strict';

// Setting up route
angular.module('app').config(['$stateProvider','JQ_LOAD',
	function($stateProvider,jqload) {
		// Users state routing
    $stateProvider.
        state('app', {
          url: '/app',
          templateUrl: 'modules/app/views/base.html'
        }).
        state('prescription', {
          url: '/prescription',
          templateUrl: 'modules/app/views/tables/tables.html'
        }).
        state('invoices', {
          url: '/invoices',
          templateUrl: 'modules/app/views/pages/invoice.html'
        }).
        state('calendar', {
          url: '/calendar',
          templateUrl: 'modules/app/views/calendar.html',
          controller: "CalendarDemoCtrl",
          resolve: {
            deps: ["$ocLazyLoad", function(a) {
              return a.load("ui.calendar")
                  .then(function() {
                    return a.load({
                      name: "app.ctrls",
                      files: ["/modules/app/controllers/lazyload/controllers/calendarCtrl.js"]
                    })
                  });
            }]
          }
        }).
        //state('reports', {
        //  url: '/reports',
        //  templateUrl: "modules/app/views/forms/uploader.html",
        //  resolve: {
        //    deps: ["$ocLazyLoad", function(a) {
        //      return a.load("flow");
        //    }]
        //}
        //}).
        state('dashboard', {
          url: '/',
          templateUrl: 'modules/app/views/dashboard.html',
          resolve: {
            deps: ["$ocLazyLoad", function(a) {
              return a.load([jqload.c3, jqload.sparkline])
                  .then(function() {
                    return a.load({
                      name: "app.directives",
                      files: ["/modules/app/controllers/lazyload/directives/sparkline.directive.js"]
                    })
                  })
                  .then(function() {
                    return a.load("angular-c3");
                  })
                  .then(function() {
                    return a.load("easypiechart");
                  })
            }]
          }

        });

	}
]);
