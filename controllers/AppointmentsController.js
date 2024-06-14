const moment = require('moment/moment');
const Appointments = require('../models/Appointments');
const Users = require('../models/Users');


exports.index = async (req, res) => {
  try {
    const citas = await Appointments.findAll();
    return res.json(citas);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error al obtener citas' });
  }
};

exports.show = async (req, res) => {
  try {
    const cita = await Appointments.findByPk(req.params.id);
    if (!cita) {
      return res.status(404).json({ error: 'Cita no encontrada' });
    }
    return res.json(cita);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error al obtener cita' });
  }
};

function validarCurp(curp) {
    const regex = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[0-9A-Z]{2}$/;
    return regex.test(curp);
  }
  
  function generateHash() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }
  
  exports.create = async (req, res) => {
    const { curp, date } = req.body;
  
    if (!curp || !date) {
      return res.status(400).json({ error: 'CURP y fecha de cita son requeridos' });
    }
    if (!validarCurp(curp)) {
      return res.status(400).json({ error: 'Formato de CURP inválido' });
    }
  
    const appointmentDate = moment(date).startOf('day');
    const today = moment().startOf('day');
  
    try {
      const existingAppointment = await Appointments.findOne({ where: { curp } });
  
      if (existingAppointment) {
        const existingAppointmentDate = moment(existingAppointment.date).startOf('day');
        if (existingAppointmentDate.isAfter(today)) {
          return res.status(401).json({ error: 'Ya existe una cita futura para este CURP' });
        }else{
            return res.status(401).json({ error: 'Ya existe una cita' });
        }
      }else{

          let user = await Users.findOne({ where: { curp } });
          if (!user) {
                user = await Users.create({ curp });
                await Appointments.create({ curp, folio: generateHash(), date: appointmentDate, user_id: user.id });
            }else{
                await Appointments.create({ curp, folio: generateHash(), date: appointmentDate, user_id: user.id });
            }
        return res.status(201).json({ message: 'Cita creada correctamente' });

      }
  
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

exports.update = async (req, res) => {
  const { curp, date } = req.body;
  try {
    const cita = await Appointments.findByPk(req.params.id);
    if (!cita) {
      return res.status(404).json({ error: 'Cita no encontrada' });
    }
    cita.curp = curp;
    cita.fecha = date;
    await cita.save();
    return res.json(cita);
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'CURP ya existe para otra cita' });
    }
    console.error(err);
    return res.status(500).json({ error: 'Error actualizar cita' });
  }
};

exports.middlewareDelete = async (req, res, next) => {
    const { folio, id_user } = req.body;

    if (!folio || !id_user) {
        return res.status(400).json({ error: 'Folio y ID de usuario son requeridos' });
    }
    

    try {
      const cita = await Appointments.findOne({where: {folio}});
      if (!cita) {
        return res.status(404).json({ error: 'Cita no encontrada' });
      }
  
      const user = await Users.findByPk(id_user);
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
      if(cita.curp !== user.curp) {
        return res.status(403).json({ error: 'No tienes permiso para eliminar esta cita' });
      }
      next();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


exports.delete = async (req, res) => {
  try {
    const cita = await Appointments.findByPk(req.params.id);
    await cita.destroy();
    return res.json({ message: 'Cita Eliminada' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error al eliminar cita' });
  }
};