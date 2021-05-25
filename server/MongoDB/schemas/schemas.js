
let schemas = [];

function add(obj) {
    schemas[obj.name] = obj.schema
    return obj.name;
}

add(require("./page"));
add(require("./wiki"));

module.exports.all = schemas;
module.exports.get = function(name) {
    return schemas[name];
}