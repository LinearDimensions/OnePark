const express = require('express')
const helper = require('./helper')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
  });

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.get('/incidentreport/:carparkname', (req, res) => {
  var carpark = req.params.carparkname
  helper.get_incident_report(carpark, function(data) {
    res.send(data)
  })
})


app.get('/carpark/:carparkname', (req, res) => {
  var carpark = req.params.carparkname
  helper.get_carpark(carpark, function(data) {
    res.send(data)
  })
})


app.post('/report', (req, res) => {
  var carpark = req.body.carpark
  var report = req.body.report
  //var phone_number = req.body.phone_number

  helper.insert_incident_report(carpark, report)
  res.send(200)
})

app.get('/carparklot/:carparkname', (req, res) => {
  var carpark = req.params.carparkname
  helper.get_carparklot_availability(carpark, function(data) {
    res.send(data)
  })
})


app.listen(port, "192.168.1.13", () => {
  console.log(`Example app listening on port ${port}`)
})