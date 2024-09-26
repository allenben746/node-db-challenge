exports.seed = function(knex, Promise) {
    return knex("tasks").insert([
      {
        task_description: "Test-task0",
        task_notes: "read read read",
        completed: 0,
        project_id: 1
      },
      {
        task_description: "Test-task1",
        task_notes: "read read read",
        completed: 0,
        project_id: 1
      },
      {
        task_description: "Test-task2",
        task_notes: "read read read",
        completed: 0,
        project_id: 2
      },
      {
        task_description: "Test-task3",
        task_notes: "read read read",
        completed: 0,
        project_id: 2
      },
      {
        task_description: "Test-task4",
        task_notes: "read read read",
        completed: 0,
        project_id: 3
      },
      {
        task_description: "Test-task5",
        task_notes: "read read read",
        completed: 0,
        project_id: 3
      },
      {
        task_description: "Test-task6",
        task_notes: "read read read",
        completed: 0,
        project_id: 3
      }
    ]);
  };