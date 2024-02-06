- This is a Task App that allows below operations:
  - Add a Task
    - Route : `http://localhost:3000/task`
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
    - Route : `http://localhost:3000/task`
    - Method : `GET`
    
    - List all Tasks that are Done/Undone
        - Route : `http://localhost:3000/task?completed=true`
        - completed : true or false

    - Filter tasks based on created date 
        - Route :  `http://localhost:3000/task?sortByDate=asc`
        - sortByDate Takes two values `asc` or `desc`
    
    - If you want both the above filters together
        - Route : `http://localhost:3000/task?completed=true&sortByDate=asc`
        - completed : true or false
        - sortByDate Takes two values `asc` or `desc`


  - Filter tasks based on priority  
    - Route : `http://localhost:3000/task/priority/:level`
    - Method : `GET`
    - level : Low, Medium, High

    
  - Update Task
    - Route : `http://localhost:3000/task/:id`
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
    - Route : `http://localhost:3000/task/:id`
    - Method : `DELETE`
