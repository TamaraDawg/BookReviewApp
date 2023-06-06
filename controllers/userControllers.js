const User = require('../models/User');

exports.signUpUser = async (req, res) => {
  try {
    // Add a new user data to user table using User data model
    const userData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    res.status(200).json({
      status: 'success',
      message: 'User account has been successfully created.',
    });
  } catch (err) {
    // If an error occurs, send a response with a status code of 400
    // and the error object as JSON
    res.status(400).json({
      status: 'fail',
      message: 'There was a problem in creating your account!',
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    // If user is already logged in, do nothing
    if (req.session.loggedIn) {
      res.status(404).json({
        status: 'error',
        message: 'User is already logged in!',
      });
      return;
    }

    const dbUserData = await User.findOne({
      attributes: [
        'id',
        'username',
        'email',
        'password',
        'createdAt',
        'updatedAt',
      ], //need this or it will be upset about the NULL image in User model
      where: {
        email: req.body.email, //search by username. can use if statement if we want to use email or username
      },
    });

    if (!dbUserData) {
      res.status(404).json({
        status: 'error',
        message: 'Incorrect email. Please try again!',
      });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(404).json({
        status: 'error',
        message: 'Incorrect password. Please try again!',
      });
      return;
    }

    // Once the user successfully logs in, set up the sessions variable 'loggedIn'
    req.session.save(() => {
      // req.session.user_id = dbUserData.id;
      req.session.loggedIn = true;
      res.status(200).json({
        status: 'success',
        message: 'User has been successfully logged in.',
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error!',
    });
  }
};

exports.logoutUser = (req, res) => {
  // When the user logs out, destroy the session
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res
      .status(404)
      .json({
        status: 'fail',
        message: 'User is not logged in!',
      })
      .end();
  }
};
