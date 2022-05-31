const db = require("../models");
const Flight = db.flight_details;
const City = db.city;
const createError = require("../utils/error");
const FlightSchedule = db.flight_schedule;

const createFlightSchedule = async (req, res, next) => {
  try {
    if (req.body.source === req.body.destination)
      return next(createError(401, "source and destination must be different"));
    if (req.body.departureTime === req.body.arrivalTime)
      return next(
        createError(401, "departureTime and arrivalTime must be different")
      );
    if (req.body.departureTime > req.body.arrivalTime)
      return next(
        createError(401, "arrival time should be greater than departure time")
      );
    if (req.body.totalAvailableSeats < 0)
      return next(createError(401, "totalAvailableSeats must be positive"));
    if (req.body.pricePerSeat < 0)
      return next(createError(401, "pricePerSeat must be positive"));
    const flight = Flight.findOne({ where: { id: req.body.flightId } });
    if (!flight) return next(createError(401, "Flight not found"));
    const source = City.findOne({ where: { id: req.body.source } });
    if (!source) return next(createError(401, "source city not found"));
    const destination = City.findOne({ where: { id: req.body.destination } });
    if (!destination)
      return next(createError(401, "destination city not found"));
    const flightSchedule = await FlightSchedule.create({
      flightId: req.body.FlightId,
      source: req.body.source,
      destination: req.body.destination,
      departureTime: req.body.departureTime,
      arrivalTime: req.body.arrivalTime,
      totalAvailableSeats: req.body.totalAvailableSeats,
      pricePerSeat: req.body.pricePerSeat,
    });
    await flightSchedule.save();
    res.status(200).json({ success: true, flightSchedule });
  } catch (err) {
    next(err);
  }
};
const updateFlightSchedule = async (req, res, next) => {
  try {
    const updateFlightSchedule = await FlightSchedule.update(
      req.body,
      { where: { id: req.params.id } },
      { new: true, runValidator: true, useFindAndModify: false }
    );
    if (!updateFlightSchedule) {
      return next(createError(404, "FlightSchedule not found"));
    }
    const flightSchedule = await FlightSchedule.findOne({
      where: { id: req.params.id },
    });
    res.status(200).json({ flightSchedule, success: true });
  } catch (err) {
    next(err);
  }
};

const deleteFlightSchedule = async (req, res, next) => {
  try {
    await FlightSchedule.destroy({ where: { id: req.params.id } });
    res.status(200).json("FlightSchedule has been deleted");
  } catch (err) {
    next(err);
  }
};

const getFlightSchedule = async (req, res, next) => {
  try {
    const flightSchedule = await FlightSchedule.findOne({
      where: { id: req.params.id },
    });
    res.status(200).json(flightSchedule);
  } catch (err) {
    next(err);
  }
};
const getFlightSchedules = async (req, res, next) => {
  try {
    const flightSchedulees = await FlightSchedule.findAndCountAll();
    res.status(200).json({ flightSchedulees });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createFlightSchedule,
  updateFlightSchedule,
  deleteFlightSchedule,
  getFlightSchedule,
  getFlightSchedules,
};
