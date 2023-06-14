const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const MONGODB_URI = 'mongodb://localhost/todos';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((error) => {
    console.error('Error starting server:', error);
    process.exit(1);
  });

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  }
});

const Todo = mongoose.model('Todo', todoSchema);

app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/todos', async (req, res) => {
  try {
    const { title } = req.body;
    const todo = new Todo({
      title
    });
    await todo.save();
    res.status(201).json({ success: true });
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = app;

