'use strict';

// Reports controller
angular.module('reports').controller('ReportsController', ['$scope', '$http', '$stateParams', '$location', 'Authentication', 'Reports','Upload',
	function($scope, $http, $stateParams, $location, Authentication, Reports, $upload) {
		$scope.authentication = Authentication;

		// Create new Report
		$scope.create = function() {
			// Create new Report object
			var report = new Reports ({
				fileName: this.fileName
			});

			// Redirect after save
			report.$save(function(response) {
				//$location.path('reports/' + response._id);
        alert("report uploaded!")
				// Clear form fields
				$scope.fileName = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Report
		$scope.remove = function(report) {
			if ( report ) { 
				report.$remove();

				for (var i in $scope.reports) {
					if ($scope.reports [i] === report) {
						$scope.reports.splice(i, 1);
					}
				}
			} else {
				$scope.report.$remove(function() {
					$location.path('reports');
				});
			}
		};

		// Update existing Report
		$scope.update = function() {
			var report = $scope.report;

			report.$update(function() {
				$location.path('reports/' + report._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Reports
		$scope.find = function() {
			$scope.reports = Reports.query();
		};

		// Find existing Report
		$scope.findOne = function() {
			$scope.report = Reports.get({ 
				reportId: $stateParams.reportId
			});
		};

    //Upload ProfilePic
    $scope.$watch('files', function() {
      $scope.onFileSelect($scope.files);
    });

    $scope.imageUploads = [];
    $scope.abort = function(index) {
      $scope.upload[index].abort();
      $scope.upload[index] = null;
    };


    $scope.onFileSelect = function (files) {
      $scope.files = files;
      $scope.upload = [];
      if (files && files.length) {
        var bucketName;
        $http.get('/api/config').success(function(response) {
          bucketName = response.awsConfig.bucket;
        })
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          file.progress = parseInt(0);
          (function (file, i) {
            console.log(file.name.split('.').pop());
            $http.get('/api/s3Policy?mimeType=' + file.type +"&folder="+ $scope.authentication.user._id+"/").success(function (response) {
              var s3Params = response;
              $scope.upload[i] = $upload.upload({
                url: 'http://' + bucketName + '.s3.amazonaws.com/',
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                  var str = [];
                  for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                  return str.join("&");
                },
                fields: {
                  'key': $scope.authentication.user._id+'/' + file.name,
                  'acl': 'private',
                  'Content-Type': file.type,
                  'AWSAccessKeyId': s3Params.AWSAccessKeyId,
                  'success_action_status': '201',
                  'Policy': s3Params.s3Policy,
                  'Signature': s3Params.s3Signature
                },
                file: file
              });
              $scope.upload[i]
                  .then(function (response) {
                    file.progress = parseInt(100);
                    if (response.status === 201) {
                      var data = xml2json.parser(response.data),
                          parsedData;
                      parsedData = {
                        location: data.postresponse.location,
                        bucket: data.postresponse.bucket,
                        key: data.postresponse.key,
                        etag: data.postresponse.etag
                      };
                      $scope.fileName = decodeURIComponent(data.postresponse.location);
                      $scope.create();
                      console.log($scope.fileName);
                    } else {
                      alert('Upload Failed');
                    }
                  }, null, function (evt) {
                    console.log(parseInt(100.0 * evt.loaded / evt.total))
                    file.progress = parseInt(100.0 * evt.loaded / evt.total);
                  });
            });
          }(file, i));
        }
      }
    };
  }
]);
