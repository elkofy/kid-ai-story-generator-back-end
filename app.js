const express = require("express");
const cors = require("cors");
;
const { Sequelize, DataTypes } = require('sequelize');

const app = express();

app.use(express.urlencoded({ extended: false }));;

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());
const sequelize = new Sequelize('mysql://root:@localhost:3306/bdd_ia_story');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username: username, password: password } });
    if (user) {
        res.render('loggedin', { username: username });
    } else {
        res.render('login', { error: 'Invalid username or password.' });
    }
});

require("./app/routes/openaiRoute")(app);
app.get('/login', (req, res) => {
    res.render('login', { error: null });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
