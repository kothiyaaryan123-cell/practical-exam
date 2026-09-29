# Student Management System - React JS Practical Exam

This project follows the practical exam requirements shown in the provided question images.

## Requirements covered

1. React project structure
2. StudentList, StudentForm, StudentDetails, PrivateRoute, Navbar
3. Redux store, actions, reducers and Redux Thunk
4. JSON Server backend using `db.json`
5. Fetch and display students
6. Add student with name, phone, email, age, class, roll number, grade and image
7. Update student
8. Delete student
9. Sort by name / roll number and filter by class
10. Simple user authentication with protected student routes
11. Responsive Bootstrap Navbar
12. Bootstrap styling

## Demo Login

- Email: `admin@gmail.com`
- Password: `123456`

Authentication is a simple frontend demo using localStorage, suitable for a practical exam. JSON Server stores student CRUD data.

## Run the project

Open terminal in this project folder:

```bash
npm install
```

### Terminal 1 - JSON Server

```bash
npm run server
```

JSON Server runs at:
`http://localhost:5000`

Students API:
`http://localhost:5000/students`

### Terminal 2 - React

```bash
npm start
```

React runs at:
`http://localhost:3000`

### One command (optional)

After `npm install`, you can run:

```bash
npm run dev
```

This starts React and JSON Server together.

## Main folders

```text
src/
  actions/
  components/
  pages/
  reducers/
  store/
  App.js
  index.js
  api.js
db.json
package.json
```

## Important practical flow

Login -> Student List -> Add Student -> Student Details -> Edit/Delete -> Search/Sort/Filter -> Logout.
