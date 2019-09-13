exports.seed = function(knex, Promise) {
    return knex("projects").insert([
      {
        project_name: "Test0",
        project_description: "Test0",
        completed: 0
      },
      {
        project_name: "Test1",
        project_description: "Test1",
        completed: 0
      },
      {
        project_name: "Test2",
        project_description: "Test2",
        completed: 0
      }
    ]);
  };