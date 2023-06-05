const User = require('../models/User');

exports.signUpUser = (req, res) => {
  try {
    res.status(200).render('signup');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}; //redirect to signup page /api/users/signup
