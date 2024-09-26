const express = require("express");

const Projects = require("./project-model.js");

const router = express.Router();

router.get("/", (req, res) => { //Passed test localhost:8000/api/projects/
  Projects.get()
    .then(projects => {

      res.status(200).json(projects);
    })
    .catch(err => {
        console.warn(err);
      res.status(500).json({ message: "Could not retrieve projects." });
    });
});

router.get("/id/:id", (req, res) => { //Passed test localhost:8000/api/projects/2
  const { id } = req.params;

  Projects.getById(id)
    .then(project => {
      const booleanProject = {
        ...project[0],
        completed: !!+`${project.completed}`
      };

      if (!project[0]) {
        return res.status(404).json({ message: "Invalid project id" });
      } else {
        res.status(200).json(booleanProject);
      }
    })
    .catch(err => {
        console.warn(err);
      res.status(500).json({ message: "Could not retrieve project. Check id." });
    });
});

router.post("/", (req, res) => { //Passed test localhost:8000/api/projects/
  const project = req.body;

  if (!project.project_name) {
      console.warn("Name is missing.")
    return res.status(404).json({ message: "Name is missing - retry." });
  }

  Projects.add(project)
    .then(count => {
      res.status(201).json(count);
    })
    .catch(err => {
        console.warn(err);
      res.status(500).json({ message: "Could not add project to database." });
    });
});

//Tasks

router.get('/tasks', (req, res) => {
    Projects.getTasks()
        .then(tasks => {
            res.status(200).json(tasks)
        })
        .catch(err => {
          console.warn(err)
            res.status(500).json({ message: 'Failed to get tasks', });
        });
});

router.post('/:id/add-task', (req, res) => { //Passed localhost:8000/api/projects/1/add-task
  const { id } = req.params;
  const newTask = req.body;

  Projects.addTask(id, newTask)
      .then(task => {
          res.status(201).json(task);
      })
      .catch (err => {
        console.warn(err);
          res.status(500).json({ message: 'Failed to create task'});
      });
});


// router.get("/:id/tasks", (req, res) => { //Passed test localhost:8000/api/projects/2/tasks
//   const { id } = req.params;
//   console.log(id);
//   Projects.getTasks(id)
//     .then(tasks => {
//       console.log(tasks);
//       if (!tasks[0]) {
//         res.status(404).json({ message: "Invalid project id" });
//       } else {
//         res.status(200).json(tasks);
//       }
//     })
//     .catch(err => {
//         console.warn(err);
//       res.status(500).json({ message: "Error fetching tasks from database" });
//     });
// });

// router.post("/:id/tasks", (req, res) => { //Passed test localhost:8000/api/projects/2/tasks
//   const { id } = req.params;
//   const task = req.body;
//   console.log(id);
//   Projects.getById(id).then(project => {
//     if (!project[0]) {
//       return res.status(404).json({ message: "Invalid Project ID" });
//     }
//     if (!task.task_description) {
//       return res.status(404).json({ message: "Missing task description" });
//     }
//     Projects.addTask(id, task)
//       .then(count => {
//         res.status(201).json(count);
//       })
//       .catch(err => {
//         console.warn(err);
//         res.status(500).json({ message: "Error adding task to database" });
//       });
//   });
// });

module.exports = router;