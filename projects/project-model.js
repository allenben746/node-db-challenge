const db = require("../data/db-config.js");

module.exports = {
  get,
  getById,
  add,
  getTasks,
  addTask
};

function get() {
  return db("projects");
}

function getById(id) {
  return db("projects").where({ id });
}

function add(project) {
  return db("projects").insert(project);
}

function getTasks() {
  return db('tasks')
      .then(tasks => {
          tasks.map( task => {
              if(task.completed) {
                  task.completed = true
              }
              else {
                  task.completed = false
              }
          })
          return tasks
      })
}

function addTask(id, task) {
  return db("tasks")
    .where({ project_id: id })
    .insert(task);
}