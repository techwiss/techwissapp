'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Doctor Schema
 */
var DoctorSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Doctor name',
		trim: true
	},
  profilePic: {
    type: String,
    default: 'https://cdn0.iconfinder.com/data/icons/customicondesign-office6-shadow/256/doctor.png'
  },
  location: {
    type: String,
    default: 'USA',
    required: 'Please fill Doctor location',
    trim: true
  },
  qualification: [],
  speciality: {
    type: String,
    default: '',
    required: 'Please fill speciality',
    trim: true
  },
  timeZone: {
    type: String,
    default: '',
    required: 'Please fill description'
  },
  description: {
    type: String,
    default: '',
    required: 'Please fill description'
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

mongoose.model('Doctor', DoctorSchema);
