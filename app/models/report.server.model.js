'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Report Schema
 */
var ReportSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Report name',
		trim: true
	},
	url: {
		type: String,
		required: true,
		trim:true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Report', ReportSchema);
