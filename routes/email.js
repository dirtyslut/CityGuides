var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "christina.freeze@gmail.com",
        pass: "12771Caswell"
    }
});


router.get('/email',function(req,res){
  res.render('email');
});

router.post('/',function(req, res){
  var mailOptions = {
    to : req.body.to,
    subject : req.body.subject,
    text : req.body.text
  };
  console.log(mailOptions);
  smtpTransport.sendMail(mailOptions, function(error, response){
  if(error){
    console.log(error);
    res.end("something went wrong");
  } else {
    console.log("Message sent: " + response.message);
    res.end("sent");
  }
  });
});

module.exports = router;