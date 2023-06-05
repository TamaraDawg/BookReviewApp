const router = require('express').Router();
const { User } = require('../models')

// Create new user
// Route to Sign up page
router.post('/signup', async (req, res) => {
  try {
    // Add a new user data to user table using User data model
    const userData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    }); 
  
    // Save the session so after the user sign up, the user doesn't need to log in again
    req.session.save(() => {
      // Assign the user's ID to the session's user_id property
      req.session.user_id = userData.id;
      // Set the session's logged_in property to true 
      req.session.logged_in = true; 
      // Send a response with a status code of 200 and the user data as JSON
      res.status(200).json(userData); 

    });
  } catch (err) {
      // If an error occurs, send a response with a status code of 400 
      // and the error object as JSON
      res.status(400).json(err); 
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      attributes: ['id', 'username', 'email', 'password', 'createdAt', 'updatedAt'], //need this or it will be upset about the NULL image in User model
      where: {
        username: req.body.username, //search by username. can use if statement if we want to use email or username
      },
    });

    if (!dbUserData) {
      res
        .status(500) 
        .render('login', { message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
      .status(500)
      .render('login', { message: 'Incorrect email or password. Please try again!' });
    return;
    }

    // Once the user successfully logs in, set up the sessions variable 'loggedIn'
    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).redirect('/'); //redirect to homepage if login is successful
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  // When the user logs out, destroy the session
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;