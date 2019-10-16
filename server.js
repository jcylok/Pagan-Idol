const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Database
const db = require('./models')

// ----------------------------------------- MIDDLEWARE
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// ----------------------------------------- ROUTES
// GET Home Route
app.get('/', (req, res) => {
    res.sendFile('views/index.html', {
        root: __dirname,
    });
})

// GET View Route
app.get('/api/v1/', (req, res) => {
    res.json({
      status: 200, 
      message: 'Welcome to the User Api.',
      endpoints: [
        {
          method: 'GET', 
          path: '/api/v1',
          description: 'Describes all availible endpoints.'
        }
      ]
    });
  });

// GET dashboard Route
app.get('/dashboard', (req, res) => {
    res.sendFile('views/dash.html', {
        root: __dirname,
    });
  });

// GET users index
app.get('/api/v1/users', (req, res) => {
    db.User.find({}, (error, allUsers) => {
      if (error) return console.log(error);
      res.json({
        status:200,
        count: allUsers.length,
        data: allUsers,
        dateRequested: new Date().toLocaleString()
      });
    });
  });

// GET users show
app.get('/api/v1/users/:firstName', (req, res) => {
    db.User.findOne({firstName:req.params.firstName}, (error, foundUsers) => {
      if (error) return console.log(error);
        res.json({
          status: 200,
          data: foundUsers,
          dateRequested: new Date().toLocaleString()
        });
    });
  });

// POST users create
app.post('/api/v1/users', (req, res) => {
    db.User.create(req.body, (error, createdUsers) => {
      if (error) return console.log(error);
      res.json({
        status: 201,
        data: createdUsers,
        dateRequested: new Date().toLocaleString()
      });
    });
   });

// DELETE users
app.delete('/api/v1/users/:userId', (req, res) => {
  db.User.findByIdAndDelete(req.params.userId, (error, deletedUser) => {
      if (error) return console.log(error);

      res.json({
          status: 200,
          count: 1,
          data: deletedUser,
          dateRequested: new Date().toLocaleString()
      })
  });
});



// Start server
app.listen(PORT, () => console.log(`server started on port ${PORT}...`));
