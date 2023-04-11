const crypto = require("crypto");

const authTokens = {};

exports.login = (req, res) => {
  const { login, password } = req.body;
  const hashedPassword = getHashedPassword(password);

  const user = users.find((u) => {
    return u.login === login && hashedPassword === u.password;
  });

  if (user) {
    const authToken = generateAuthToken();

    // Store authentication token
    authTokens[authToken] = user;

    // Setting the auth token in cookies
    res.cookie("AuthToken", authToken);

    // Redirect user to the protected page
    res.redirect("/home");
  } else {
    res.status(500).send("Invalid username or password");
  }
};

exports.register = (req, res) => {
  const { login, password, confirmPassword } = req.body;

  // Check if the password and confirm password fields match
  if (password === confirmPassword) {
    // Check if user with the same email is also registered
    if (users.find((user) => user.login === login)) {
      res.status(500).send("User exist in the system");

      return;
    }

    const hashedPassword = getHashedPassword(password);

    // Store user into the database if you are using one
    users.push({
      login,
      password: hashedPassword,
    });

    res.status(200).send(hashedPassword);
  } else {
    res.status(500).send("Password does not match.");
  }
};

const generateAuthToken = () => {
  return crypto.randomBytes(30).toString("hex");
};

const getHashedPassword = (password) => {
  const sha256 = crypto.createHash("sha256");
  const hash = sha256.update(password).digest("base64");
  return hash;
};

//mock Data
const users = [
  {
    login: "admin",
    //hash for admin
    password: "jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg=",
  },
];

//https://stackabuse.com/handling-authentication-in-express-js/
