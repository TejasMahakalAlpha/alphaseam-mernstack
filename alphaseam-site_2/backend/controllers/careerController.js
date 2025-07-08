const Career = require('../models/Career');

exports.getCareers = async (req, res) => {
  const careers = await Career.find();
  res.json(careers);
};

exports.createCareer = async (req, res) => {
  const newCareer = new Career(req.body);
  await newCareer.save();
  res.status(201).json(newCareer);
};

exports.updateCareer = async (req, res) => {
  const updated = await Career.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteCareer = async (req, res) => {
  await Career.findByIdAndDelete(req.params.id);
  res.json({ message: 'Career deleted' });
};
