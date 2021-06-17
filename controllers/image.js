const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'cde1cdfab7874e1581f1e4496b8377d4',
});

const handleApiCall = (req, res) => {
  app.models
    .predict('e15d0f873e66047e579f90cf82c9882z', req.body.input)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json('Unable to work with API'));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => res.status(400).json('Unable to get entries'));
};

module.exports = {
  handleImage: handleImage,
  handleApiCall: handleApiCall,
};
