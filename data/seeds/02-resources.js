exports.seed = function(knex, Promise) {
    return knex("resources").insert([
      {
        resource_name: "test-resource0",
        resource_description: "test-resource0"
      },
      {
        resource_name: "test-resource1",
        resource_description: "test-resource1"
      },
      {
        resource_name: "test-resource2",
        resource_description: "test-resource2"
      },
      {
        resource_name: "test-resource3",
        resource_description: "test-resource3"
      },
      {
        resource_name: "test-resource4",
        resource_description: "test-resource4"
      },
      {
        resource_name: "test-resource5",
        resource_description: "test-resource5"
      }
    ]);
  };