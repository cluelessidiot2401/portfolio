const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GAPI_CLIENT_ID);

module.exports = async function (req, res, next) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: req.headers.tokenid,
      audience: process.env.GAPI_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const { name, email, picture, email_verified } = payload;
    const verifiedUser = { name, email, picture, email_verified };

    // If request specified a G Suite domain:
    // const domain = payload['hd'];

    if (!verifiedUser || !verifiedUser.name || !verifiedUser.email) {
      const err = new Error("UnAuthenticated user");
      err.status = 401;
      return next(err);
    } else if (!verifiedUser.email_verified) {
      const err = new Error("UnAuthorized user");
      err.status = 403;
      return next(err);
    } else {
      req.verifiedUser = verifiedUser;
      return next();
    }
  } catch (error) {
    return next(error);
  }
};
