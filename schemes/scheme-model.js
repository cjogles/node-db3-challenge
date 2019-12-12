const db = require("../data/db-config.js");

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
};

function find() {
    return db
    .select('*')
    .from('schemes');
}

function findById(id) {
  return db("schemes")
    .where({ id })
    .first();
}

function findSteps(id) {
    return db
      .select('*')
      .from('schemes')
      .innerJoin('steps', 'schemes.id', 'steps.scheme_id')
      .where('schemes.id', id)
}

function add(scheme) {
    return db("schemes")
        .insert(scheme, "id")
        .then(ids => {
            const [id] = ids;
            return findById(id);
        });
}

function update(changes, id) {
  return db("schemes")
    .where('id', id)
    .update(changes)
    .then(newScheme => {
      return newScheme;
  });
}

function remove(id) {
  return db("schemes")
    .where('id', id)
    .del()
}
