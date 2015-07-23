'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Report = mongoose.model('Report'),
	_ = require('lodash'),
	stream = require('stream').Stream;
var mkdirp = require('mkdirp');

/**
 * Create a Report
 */
exports.create = function(req, res) {
	var report = new Report(req.body);
	report.user = req.user;

	report.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(report);
		}
	});
};

/**
 * Show the current Report
 */
exports.read = function(req, res) {
	res.jsonp(req.report);
};

/**
 * Update a Report
 */
exports.update = function(req, res) {
	var report = req.report ;

	report = _.extend(report , req.body);

	report.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(report);
		}
	});
};

/**
 * Delete an Report
 */
exports.delete = function(req, res) {
	var report = req.report ;

	report.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(report);
		}
	});
};

/**
 * List of Reports
 */
exports.list = function(req, res) { 
	Report.find().sort('-created').populate('user', 'displayName').exec(function(err, reports) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(reports);
		}
	});
};

/**
 * Report middleware
 */
exports.reportByID = function(req, res, next, id) { 
	Report.findById(id).populate('user', 'displayName').exec(function(err, report) {
		if (err) return next(err);
		if (! report) return next(new Error('Failed to load Report ' + id));
		req.report = report ;
		next();
	});
};

/**
 * Report authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.report.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};

/**
 * Report uploading check
 */
exports.checkUpload = function(req, res) {
	var filePath = "public/reports/" + req.user._id;
	var flow = require('../../app/flow/node-flow.js')('../../../'+filePath);
	flow.get(req, function(status, filename, original_filename, identifier) {
		console.log('GET', status);
		if (status == 'found') {
			status = 200;
		} else {
			status = 204;
		}
		res.status(status).send();
	});
};

/**
 * Report Upload
 */

exports.upload = function(req, res) {
	var filePath = "public/reports/" + req.user._id;
	var flow = require('../../app/flow/node-flow.js')('../../../'+filePath);
		mkdirp(filePath, function(err) {
			console.log(err, filePath);
		});
	flow.post(req, function(status, filename, original_filename, identifier) {
		//console.log('POST', status, original_filename, identifier);
		if(status == "done") {
			var report = new Report();
			report.user = req.user;
			report.name = original_filename;
			report.url = filePath + "/" + identifier;
			report.save(function(err) {
				if (err) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				} else {
					//res.jsonp(report);
				}
			});
		}
		res.status(status).send();
	});
}

/**
 * Report Download
 */
exports.download = function(req, res) {
	flow.write(req.params.identifier, res);
}
