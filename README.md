# Todo App

A simple and elegant Todo App built with Node.js and Express.

## Features

- ✅ Add new tasks
- ✏️ Mark tasks as complete/incomplete
- 🗑️ Delete tasks
- 📱 Responsive design
- 🎨 Beautiful UI with gradient background

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ademoa97-design/todo-app.git
   cd todo-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. Open your browser and visit:
   ```
   http://localhost:3000
   ```

## Development

To run the app with auto-reload during development:

```bash
npm run dev
```

This uses `nodemon` to automatically restart the server when files change.

## Project Structure

```
todo-app/
├── app.js              # Express server with API endpoints
├── package.json        # Project dependencies
├── public/
│   ├── index.html      # HTML structure
│   ├── style.css       # Styling
│   └── script.js       # Frontend JavaScript
└── README.md           # This file
```

## API Endpoints

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Add a new todo
- `PUT /api/todos/:id` - Toggle todo completion status
- `DELETE /api/todos/:id` - Delete a todo

## Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Storage**: In-memory (can be upgraded to a database)

## Future Enhancements

- Add a database (MongoDB, PostgreSQL)
- User authentication
- Save todos to local storage
- Dark mode
- Todo categories

## License

ISC
