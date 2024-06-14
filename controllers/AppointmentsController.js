const Appointments = require('../models/Appointments');

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

exports.create = async (req, res) => {
  const { curp, date } = req.body;
  try {
    const nuevaCita = await Appointments.create({ curp, date });
    return res.json(nuevaCita);
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'CURP already exists for another cita' });
    }
    console.error(err);
    return res.status(500).json({ error: 'Error al crear cita' });
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

exports.delete = async (req, res) => {
  try {
    const cita = await Appointments.findByPk(req.params.id);
    if (!cita) {
      return res.status(404).json({ error: 'Cita no encontrada' });
    }
    await cita.destroy();
    return res.json({ message: 'Cita eliminada' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error al eliminar cita' });
  }
};