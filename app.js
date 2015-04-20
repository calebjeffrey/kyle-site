/**
 * Module dependencies.
 */
var express = require('express'),
    methodOverride = require('method-override'),
    path = require('path'),
    bodyParser = require('body-parser'),
    sendgrid  = require('sendgrid')('calebjeffrey', 'Kairiangel01');

// create express instance
var app = express();

// static folder setup
app.use(express.static(path.join(__dirname, './static/')));

// initialize authentication
// cors
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');

    next();
});

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.post('/form', function(req, res) {

    sendgrid.send({
        to:       'QandA@ESKluft.com',
        from:     req.body.email,
        subject:  'Kluft Form Contact',
        text:     req.body.message
        }, function(err, json) {
            if (err) { return console.error(err); }
            console.log(json);
            sendgrid.send({
                to: req.body.email,
                from: 'QandA@ESKluft.com',
                subject: 'Re: your Kluft request',
                text: 'Hello,\nThank you for reaching out to E.S. Kluft & Company. Your query is important to us.\nWe typically answer emails within 2 business days of receiving them. Our business hours are Monday through Friday 10AM – 6PM PST.\n\nSincerely,\nThe E.S. Kluft & Company team'
            });
        });
});

app.get('*', function(req, res){
    res.sendFile(__dirname + '/static/index.html');
});

// listen
app.set('port', process.env.PORT || 8000);
app.listen(app.get('port'));
