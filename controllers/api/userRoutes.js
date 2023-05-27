const router = require('express').Router();
const { User } = require('../../models')

// Create new user
router.post('/', async (req, res) => {
  try {
    // Create a new user based on the data in the request body
    const userData = await User.create(req.body); 

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
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    // Once the user successfully logs in, set up the sessions variable 'loggedIn'
    req.session.save(() => {
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
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