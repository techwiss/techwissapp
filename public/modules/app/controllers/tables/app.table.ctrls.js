;(function() {
"use strict";

angular.module("app.table.ctrls", [])

// Responsive Table Data (static)
.controller("ResponsiveTableDemoCtrl", ["$scope", function($scope) {

      $scope.responsiveData = [
        {
          post: "Hydrocodone",
          author: "Lipitor",
          categories: "Sickness",
          tags: ["BREAKFAST", "DINNER"],
          date: "20-8-2015",
          tagColor: "pink"
        },
        {
          post: "Zocor",
          author: "Nexium",
          categories: "Cold",
          tags: [ "LUNCH", "DINNER"],
          date: "2-8-2015",
          tagColor: "primary"
        },
        {
          post: "Lisinopril",
          author: "Plavix",
          categories: "Cough",
          tags: ["BREAKFAST", "LUNCH", "DINNER"],
          date: "20-9-2015",
          tagColor: "success"
        },
        {
          post: "Norvasc",
          author: "Abilify",
          categories: "digestion",
          tags: ["BREAKFAST", "LUNCH", "DINNER"],
          date: "10-8-2015",
          tagColor: "danger"
        },
        {
          post: "baclofen",
          author: "Epogen",
          categories: "vertigo",
          tags: ["BREAKFAST"],
          date: "2-10-2015",
          tagColor: "info"
        }

      ];
}])


// Data Table 
.controller("DataTableCtrl", ["$scope", "$filter", function($scope, $filter) {
	// data
      $scope.datas = [
        {engine: "Hydrocodone", browser: "Nexium", platform: "Cold", version: "3-6-2015", grade: "10-7-2015"},
        {engine: "Hydrocodone", browser: "Plavix", platform: "Fever", version: "22-4-2015", grade: "13-5-2015"},
        {engine: "Zocor", browser: "Nexium", platform: "Pain Killer", version: "31-6-2015", grade: "15-7-2015"},
        {engine: "Presto", browser: "Epogen", platform: "Pain Killer", version: "21-3-2015", grade: "20-5-2015"},
        {engine: "Norvasc", browser: "Nexium", platform: "Fever", version: "10-5-2015", grade: "21-8-2015"},
        {engine: "baclofen", browser: "Plavix", platform: "vertigo", version: "12-3-2015", grade: "22-8-2015"},
        {engine: "baclofen", browser: "Epogen", platform: "vertigo", version: "16-2-2015", grade: "27-8-2015"},
        {engine: "Lisinopril", browser: "Lipitor", platform: "Pain Killer", version: "17-5-2015", grade: "10-8-2015"},
        {engine: "Lisinopril", browser: "Lipitor", platform: "vertigo", version: "22-4-2015", grade:"11-8-2015"},
      ];
      var prelength = $scope.datas.length;

	// create random data (uses `track by $index` in html for duplicacy)
	for(var i = prelength; i < 100; i++) {
		var rand = Math.floor(Math.random()*prelength);
		$scope.datas.push($scope.datas[rand]);
	}

	$scope.searchKeywords = "";
	$scope.filteredData = [];	
	$scope.row = "";


	$scope.numPerPageOpts = [5, 7, 10, 25, 50, 100];
	$scope.numPerPage = $scope.numPerPageOpts[1];
	$scope.currentPage = 1;
	$scope.currentPageStores = []; // data to hold per pagination


	$scope.select = function(page) {
		var start = (page - 1)*$scope.numPerPage,
			end = start + $scope.numPerPage;

		$scope.currentPageStores = $scope.filteredData.slice(start, end);
	}

	$scope.onFilterChange = function() {
		$scope.select(1);
		$scope.currentPage = 1;
		$scope.row = '';
	}

	$scope.onNumPerPageChange = function() {
		$scope.select(1);
		$scope.currentPage = 1;
	}

	$scope.onOrderChange = function() {
		$scope.select(1);
		$scope.currentPage = 1;
	}


	$scope.search = function() {
		$scope.filteredData = $filter("filter")($scope.datas, $scope.searchKeywords);
		$scope.onFilterChange();
	}

	$scope.order = function(rowName) {
		if($scope.row == rowName)
			return;
		$scope.row = rowName;
		$scope.filteredData = $filter('orderBy')($scope.datas, rowName);
		$scope.onOrderChange();
	}

	// init
	$scope.search();
	$scope.select($scope.currentPage);



}])

}())
