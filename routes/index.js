const express = require('express');
const router = express.Router();

const AppointmentController = require('../controllers/AppointmentsController');

router.get('/',AppointmentController.index);
router.get('/:id',AppointmentController.show);
router.post('/',AppointmentController.create);
router.put('/:id',AppointmentController.update);
router.delete('/:id',AppointmentController.delete);

module.exports = router;