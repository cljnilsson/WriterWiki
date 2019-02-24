const
    app = require("../server.js").a;
    Mongo = require("../MongoDB/mongo"),
    path = require("path");


app.get("/", (req, res) => {
    res.render("index");
})

app.get("/createPage", (req, res) => {
    res.render("create");
})

app.get("/wiki/:title", async (req, res) => {
    let data = await Mongo.getPage(req.params.title);
    console.log(data);
    res.render("page", {html: data.html});
})

app.post("/createWiki", function(req, res) {
    console.log(req.body);
    Mongo.makePage(req.body.title, req.body.html, req.body.delta, req.body.raw, req.body.version);
    res.status(200);
})