// // const { Sequelize, DataTypes } = require('sequelize');
// // const express = require('express');
// // const bodyParser = require('body-parser');

// // const sequelize = new Sequelize('bdd_ia_story', 'root', '', {
// //     host: 'localhost',
// //     dialect: 'mysql'
// // });

// // const app = express();

// // app.use(bodyParser.urlencoded({ extended: true }));

// // const User = sequelize.define('User', {
// //     username: {
// //         type: DataTypes.STRING,
// //         allowNull: false
// //     },
// //     password: {
// //         type: DataTypes.STRING,
// //         allowNull: false
// //     }
// // });

// // (async () => {
// //     try {
// //         await sequelize.authenticate();
// //         console.log('Connection has been established successfully.');
// //         await User.sync({ force: true });
// //         console.log('User table created successfully.');
// //         const user = await User.create({ username: 'test', password: 'password' });
// //         console.log('User created successfully.');
// //     } catch (error) {
// //         console.error('Unable to connect to the database:', error);
// //     }
// // })();

// // app.post('/login', async (req, res) => {
// //     const { username, password } = req.body;
// //     const user = await User.findOne({ where: { username: username, password: password } });
// //     if (user) {
// //         res.send('Logged in successfully.');
// //     } else {
// //         res.send('Invalid username or password.');
// //     }
// // });

// // app.listen(3000, () => {
// //     console.log('Server running on port 3000');
// // });
// const express = require('express');
// const { Sequelize, DataTypes } = require('sequelize');

// const app = express();

// app.use(express.urlencoded({ extended: false }));

// const sequelize = new Sequelize('mysql://root:@localhost:3306/bdd_ia_story');

// const User = sequelize.define('User', {
//     username: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     password: {
//         type: DataTypes.STRING,
//         allowNull: false
//     }
// });

// app.post('/login', async (req, res) => {
//     const { username, password } = req.body;
//     const user = await User.findOne({ where: { username: username, password: password } });
//     if (user) {
//         res.render('loggedin', { username: username });
//     } else {
//         res.render('login', { error: 'Invalid username or password.' });
//     }
// });

// app.get('/login', (req, res) => {
//     res.render('login', { error: null });
// });

// app.set('view engine', 'ejs');

// app.listen(3000, () => {
//     console.log('Server running on port 3000');
// });
