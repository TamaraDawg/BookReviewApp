const router = require('express').Router();

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
