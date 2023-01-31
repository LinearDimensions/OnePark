const router = require('express').Router();
let Report = require('../models/report.model');

router.route('/').post((req, res) => {    
    const newReport = new Report({ //carpark, report, user, timestamp, status
        carpark: req.body.carpark,
        report: req.body.report,
        user: 'Daniel Li',
        status: 'Pending',
      });
      newReport.save()
      .then(() => res.json(200))
      .catch(err => res.status(400).json('Error: ' + err));
    });

router.route('/:id').get((req, res) => {
  Report.aggregate([{$match: {carpark: req.params.id}}])
  .then(exercise => res.json(exercise))
  .catch(err => res.status(400).json('Error: ' + err));
});

/*

  const newReport = new Report({ //carpark, report, user, timestamp, status
      carpark: req.body.carpark,
      report: req.body.report,
      user: 'Daniel Li',
      status: 'Pending',
    });
    newReport.save()
    .then(() => res.json(200))
    .catch(err => res.status(400).json('Error: ' + err));
  });
*/


module.exports = router;