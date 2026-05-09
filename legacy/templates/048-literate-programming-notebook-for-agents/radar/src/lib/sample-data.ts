export const SAMPLE_CONVERSATION = `## Building a REST API with Express

I'll help you create a REST API for managing a todo list. Let's start with the project setup.

First, initialize the project and install dependencies:

\`\`\`bash
mkdir todo-api && cd todo-api
npm init -y
npm install express cors
npm install -D typescript @types/express @types/cors ts-node
\`\`\`

Now let's create the TypeScript configuration:

\`\`\`json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true
  },
  "include": ["src/**/*"]
}
\`\`\`

Here's the main server file with CRUD operations for todos:

\`\`\`typescript
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
}

let todos: Todo[] = [];
let nextId = 1;

// Get all todos
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// Create a todo
app.post('/api/todos', (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  const todo: Todo = {
    id: nextId++,
    title,
    completed: false,
    createdAt: new Date(),
  };
  todos.push(todo);
  res.status(201).json(todo);
});

// Update a todo
app.patch('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  Object.assign(todo, req.body);
  res.json(todo);
});

// Delete a todo
app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(t => t.id !== id);
  res.status(204).send();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(\\\`Server running on port \\\${PORT}\\\`);
});
\`\`\`

The API provides four endpoints:
- **GET /api/todos** — Returns all todos
- **POST /api/todos** — Creates a new todo (requires \\\`title\\\` in body)
- **PATCH /api/todos/:id** — Updates a todo by ID
- **DELETE /api/todos/:id** — Deletes a todo by ID

You can test it with curl:

\`\`\`bash
# Create a todo
curl -X POST http://localhost:3001/api/todos \\
  -H "Content-Type: application/json" \\
  -d '{"title": "Learn TypeScript"}'

# Get all todos
curl http://localhost:3001/api/todos

# Mark as completed
curl -X PATCH http://localhost:3001/api/todos/1 \\
  -H "Content-Type: application/json" \\
  -d '{"completed": true}'
\`\`\`

This gives you a clean, type-safe REST API. Next steps would be adding a database (like PostgreSQL with Prisma) and input validation (with Zod).`;
