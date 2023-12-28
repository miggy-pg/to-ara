const passport = require("passport");
const { Strategy } = require("passport-jwt");
const { JWT_SECRET } = require("../constants");
const db = require("../db");

// get token from the request if the user sends a cookie(happen when a user is logged in)
const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["token"];
  }

  return token;
};

const opts = {
  secretOrKey: JWT_SECRET,
  jwtFromRequest: cookieExtractor,
};

passport.use(
  // get the 'id' from the payload
  new Strategy(opts, async ({ id }, done) => {
    try {
      const { rows } = await db.query(
        "SELECT id, email FROM users WHERE id = $1",
        [id]
      );
      if (!rows.length) {
        throw new Error("401 not authorized");
      }

      let user = { id: rows[0].id, email: rows[0].email };

      return await done(null, user);
    } catch (err) {
      console.log(err.message);
      done(null, false);
    }
  })
);
