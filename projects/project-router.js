const express = require("express");

const Projects = require("./project-model.js");

const router = express.Router();

router.get("/", (req, res) => {
  Projects.get()
    .then(projects => {

      res.status(200).json(projects);
    })
    .catch(err => {
        console.warn(err);
      res.status(500).json({ message: "Could not retrieve projects." });
    });
});

router.get("/:id", (req, res) => {
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

router.post("/", (req, res) => {
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
      res.status(500).json({ message: "Could not add prokect to database." });
    });
});

//Tasks

router.get("/:id/tasks", (req, res) => {
  const { id } = req.params;
  console.log(id);
  Projects.getTasks(id)
    .then(tasks => {
      console.log(tasks);
      if (!tasks[0]) {
        res.status(404).json({ message: "Invalid project id" });
      } else {
        res.status(200).json(tasks);
      }
    })
    .catch(err => {
        console.warn(err);
      res.status(500).json({ message: "Error fetching tasks from database" });
    });
});

router.post("/:id/tasks", (req, res) => {
  const { id } = req.params;
  const task = req.body;
  console.log(id);
  Projects.getById(id).then(project => {
    if (!project[0]) {
      return res.status(404).json({ message: "Invalid Project ID" });
    }
    if (!task.task_description) {
      return res.status(404).json({ message: "Missing task description" });
    }
    Projects.addTask(id, task)
      .then(count => {
        res.status(201).json(count);
      })
      .catch(err => {
        console.warn(err);
        res.status(500).json({ message: "Error adding task to database" });
      });
  });
});

module.exports = router;