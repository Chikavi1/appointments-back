const express = require('express');
const router = express.Router();

const AppointmentController = require('../controllers/AppointmentsController');

router.get('/index',AppointmentController.index);
router.get('/get/:id',AppointmentController.show);
router.post('/create',AppointmentController.create);
router.put('/update/:id',AppointmentController.update);
router.delete('/delete/:id',AppointmentController.middlewareDelete, AppointmentController.delete);


module.exports = router;    