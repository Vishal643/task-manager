- This is a Task App that allows below operations:
  - Steps to run:
    1. Clone the repository
    2. Run `npm install`
    3. Run `npm run dev`
    4. Open Postman and hit the below routes

  - To run the tests
    - Run `npm run test`

  - Add a Task
    - Route : `http://localhost:3000/tasks`
    - Method : `POST`
    - Body : 
      ```json
      {
        "title": "Task 1",
        "description": "Task 1 Description",
        "priority": "High", // Low, Medium, High and optional
        "completed": false // true or false
      }
      ```

  - List all Tasks
    - Route : `http://localhost:3000/tasks`
    - Method : `GET`
    
    - List all Tasks that are Done/Undone
        - Route : `http://localhost:3000/tasks?completed=true`
        - completed : true or false

    - Filter tasks based on created date 
        - Route :  `http://localhost:3000/tasks?sortByDate=asc`
        - sortByDate Takes two values `asc` or `desc`
    
    - If you want both the above filters together
        - Route : `http://localhost:3000/tasks?completed=true&sortByDate=asc`
        - completed : true or false
        - sortByDate Takes two values `asc` or `desc`


  - Filter tasks based on priority  
    - Route : `http://localhost:3000/tasks/priority/:level`
    - Method : `GET`
    - level : Low, Medium, High

    
  - Update Task
    - Route : `http://localhost:3000/tasks/:id`
    - Method : `PUT`
    - Body : 
      ```json
      {
        "title": "Task 1",
        "description": "Task 1 Description",
        "priority": "High", // Low, Medium, High and optional
        "completed": false // true or false
      }
      ```
    - Mark a Task as Done/Undone
    - Change the priority of a Task
    - Change the title, description 
    - If you will pass empty title or description, it will not update the title or description


  - Delete a Task
    - Route : `http://localhost:3000/tasks/:id`
    - Method : `DELETE`
