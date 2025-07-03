const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const db = require('./app/models');

const app = express();

// CORS Configuration
app.use(cors({ origin: '*' }));

// Middleware
app.use(express.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Database Connection
db.mongoose
  .connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Database connected'))
  .catch((err) => {
    console.error(`❌ Failed to connect to database: ${err.message}`);
    process.exit(1);
  });

// Root Route
app.get('/', (req, res) => {
  res.json({ message: 'Hello World, Lets Go!' });
});

// Register API Routes
require('./app/routes/todolist.route')(app);

// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
