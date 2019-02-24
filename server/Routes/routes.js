const
    app = require("../server.js").a;
    path = require("path");


app.get("/", (req, res) => {
    res.render("index");
})