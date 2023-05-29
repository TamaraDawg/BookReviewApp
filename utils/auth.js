/* To authenticate if the user is already logged in or not */

const withAuth = (req, res, next) => {
  // if the user is not logged in redirect to the log in page
 // if (!req.session.logged_in) {
 //   res.redirect('/login');
 // } else {
  next();
//  }
};

module.exports = withAuth;
