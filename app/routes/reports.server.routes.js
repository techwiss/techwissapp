'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var reports = require('../../app/controllers/reports.server.controller');
	var multipart = require('connect-multiparty');
	var multipartMiddleware = multipart();
	// Reports Routes
	app.route('/reports')
		.get(reports.list)
		.post(users.requiresLogin, reports.create);

	app.route('/reports/:reportId')
		.get(reports.read)
		.put(users.requiresLogin, reports.hasAuthorization, reports.update)
		.delete(users.requiresLogin, reports.hasAuthorization, reports.delete);

	// Finish by binding the Report middleware
	app.param('reportId', reports.reportByID);
	app.route('/upload/report')
		.post(multipartMiddleware, reports.upload)
		.get(reports.checkUpload);
	app.route('/reports/download/:identifier').get(reports.download);
};
