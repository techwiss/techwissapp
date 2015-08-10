'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Appointment Schema
 */
var AppointmentSchema = new Schema({
  title: {
    type: String,
    default: '',
    required: 'Please fill Appointment name',
    trim: true
  },
  description: {
    type: String,
    default: '',
    required: 'Please fill Appointment Description',
    trim: true
  },
  className: {
    type: String,
    default: 'bg-primary'
  },
  from: {
    type: Schema.ObjectId,
    ref: 'Doctor'
  },
  with:{
    type: String,
    default: '',
    required: 'Please fill Appointment with details',
    trim: true
  },
  start: {
    type: Date,
    default: Date.now
  },
  end: {
    type: Date,
    default: Date.now
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

mongoose.model('Appointment', AppointmentSchema);
