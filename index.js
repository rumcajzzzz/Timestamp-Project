var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date?", (req, res) => {

  var dateParams = req.params.date;

  if(!dateParams) {
    var currentDate = new Date();
    res.json({
      unix: currentDate.getTime(),
      utc: currentDate.toUTCString()
    });
    return;
  }

  if(!isNaN(dateParams)) { 
    dateParams = parseInt(dateParams);
  }

  let date = new Date(dateParams);

  if(date.toString() === "Invalid Date") {
    res.json({error: "Invalid Date"});
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }

});

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
