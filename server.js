
const express = require('express');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.set("view engine", "ejs");

app.locals.welcomeMessage = "Welcome!";

// A temporary in-memory "database" until you integrate a real database
const users = [
    {
        id:1,
        name: 'John Doe',
        email: 'john.doe@gmail.com',
        phone: '08012345678',
        field: 'Software Engineering',
    },
    {
        id:2,
        name: 'Jane Doe',
        email: 'jane.doe@gmai.com',
        phone: '034324344233',
        field: 'Software Engineering',
    },
    {
        id:3,
        name: 'Sarah smith',
        email:'sarah@gmail.com',
        phone: '08012345678',
        field: 'Software Engineering',
    }
];

// Create a user
app.post('/users', (req, res) => {
  // Logic to add a user
});

// Get All user
app.get('/users', (req, res) => {
  res.json(users);
});

// Get a Single user
app.get('/users/:id', (req, res) => {
    const user = users.find(b => b.id === parseInt(req.params.id));
    if (!user) {
      return res.status(404).send('user not found');
    }
    res.json(user);
});

// Update a user
app.put('/users/:id', (req, res) => {
    const user = users.find(b => b.id === parseInt(req.params.id));
    if (!user) {
      return res.status(404).send('user not found');
    }

    const {
        name,
        email,
        phone,
        field,
    } = req.body;
    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.field = field || user.field;

    res.send(user);
  });

// Delete a user
app.delete('/users/:id', (req, res) => {
  const user = users.findIndex(b => b.id === parseInt(req.params.id));
  if (user === -1) {
    return res.status(404).send('user not found');
  }

  users.splice(user, 1);
  res.status(204).send();
});

// Create a user
app.post('/users', (req, res) => {
    const {
        name,
        email,
        phone,
        field,
    } = req.body;
    if (
        !name ||
        !email ||
        !phone ||
        !field
    ) {
      return res.status(400).send('Missing data');
    }

    const user = { id: users.length + 1,
        name,
        email,
        phone,
        field
    };
    users.push(user);
    res.status(201).send(user);
  });


app.get("/", (_, res) => {
    res.render("default", {
      users:users.map(u => u.name)
    });
  });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
