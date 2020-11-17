import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repository/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appoitmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appoitmentsRouter.get('/', (req, res) => {
  const appointments = appointmentsRepository.all();

  return res.json(appointments);
});

appoitmentsRouter.post('/', (req, res) => {
  try {
    const { provider, date } = req.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService(
      appointmentsRepository
    );

    const appointment = createAppointment.execute({
      date: parsedDate,
      provider,
    });

    return res.json(appointment);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default appoitmentsRouter;
