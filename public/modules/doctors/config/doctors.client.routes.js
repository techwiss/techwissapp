'use strict';

//Setting up route
angular.module('doctors').config(['$stateProvider',
	function($stateProvider) {
		// Doctors state routing
		$stateProvider.
		state('listDoctors', {
			url: '/doctors',
			templateUrl: 'modules/doctors/views/list-doctors.client.view.html'
		}).
		state('createDoctor', {
			url: '/doctors/create',
			templateUrl: 'modules/doctors/views/create-doctor.client.view.html'
          //resolve: {
          //  deps: ["$ocLazyLoad", function(a) {
          //    return a.load({
          //      name: "DoctorsController",
          //      serie: true,
          //      files: [
          //        'js!https://maps.googleapis.com/maps/api/js?libraries=places',
          //      ]
          //    })
          //  }]
          //}

        }).
		state('viewDoctor', {
			url: '/doctors/:doctorId',
			templateUrl: 'modules/doctors/views/view-doctor.client.view.html'
		}).
		state('editDoctor', {
			url: '/doctors/:doctorId/edit',
			templateUrl: 'modules/doctors/views/edit-doctor.client.view.html'
		});
	}
]);
