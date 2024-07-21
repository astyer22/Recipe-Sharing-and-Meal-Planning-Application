const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run(`CREATE TABLE meal_plans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    day_of_week TEXT,
    meal_type TEXT,
    recipe_id INTEGER,
    title TEXT,
    image TEXT
  )`);
});

app.post('/meal-plan', (req, res) => {
  const { dayOfWeek, mealType, recipeId, title, image } = req.body;
  const stmt = db.prepare(`INSERT INTO meal_plans (day_of_week, meal_type, recipe_id, title, image) VALUES (?, ?, ?, ?, ?)`);
  stmt.run(dayOfWeek, mealType, recipeId, title, image, function(err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(201).send({ id: this.lastID });
  });
  stmt.finalize();
});

app.get('/meal-plan', (req, res) => {
  db.all(`SELECT * FROM meal_plans`, [], (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(200).send(rows);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Middleware to verify Firebase ID token
async function verifyToken(req, res, next) {
  const idToken = req.headers.authorization?.split('Bearer ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken; // Attach user information to request object
    next(); // Move to the next middleware
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(403).send('Unauthorized');
  }
}
// Example route that requires authentication
app.get('/protected-route', verifyToken, (req, res) => {
  // Access user information from req.user
  const userId = req.user.uid;
  // Retrieve or modify user data from Firestore or other database
  // Send response
  res.send(`Hello ${req.user.name}!`);
});
