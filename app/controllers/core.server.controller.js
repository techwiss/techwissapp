'use strict';

/**
 * Module dependencies.
 */
var nodemailer = require('nodemailer');


// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'techwiss.com@gmail',
    pass: 'Qwerty123456#'
  }
});

exports.index = function(req, res) {
	res.render('index', {
		user: req.user || null,
		request: req
	});
};

/**
 * Show the current Appointment
 */
exports.sendEmail = function(req, res) {
  var data = req.body;
  var mailOptions = {
    from: 'TechWiss Team <techwiss.com@gmail.com>',
    to: data.to,
    subject: data.subject,
    text: data.text
  };
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      console.log(error);
      res.jsonp(error)
    }else{
      console.log('Message sent: ' + info.response);
      res.jsonp('Message sent: ' + info.response);
    }
  });
};
