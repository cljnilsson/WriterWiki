const
    app = require("../server.js").a;
    Mongo = require("../MongoDB/mongo"),
    path = require("path");


app.get("/", async (req, res) => {
    let all = await Mongo.getAllPages();
    res.render("index", {all: all});
})

app.get("/createPage", (req, res) => {
    res.render("create");
})

app.get("/wiki/:title", async (req, res) => {
    let data = await Mongo.getPage(req.params.title);
    res.render("page", {html: data.html, title: data.title});
})

app.get("/wiki/:title/edit", async (req, res) => {
    let data = await Mongo.getPage(req.params.title);
    res.render("edit", {html: data.html, title: data.title});
});

app.post("/wiki/:title/edit", async (req, res) => {
    console.log(req.body.title);
    let title = req.params.title;

    if(req.body.title) {
        title = req.body.title;
        await Mongo.updateName(req.params.title, req.body.title);
    }

    await Mongo.updatePage(title, req.body.html, req.body.delta, req.body.raw);
    res.redirect(`/wiki/${title}`);
});

app.post("/createWiki", async function(req, res) {
    await Mongo.makePage(req.body.title, req.body.html, req.body.delta, req.body.raw, req.body.version);
    res.redirect(`/wiki/${req.body.title}`);
});

app.post("/backup", async (req, res) => {
    await Mongo.backup();
    res.status(200).send("Complete");
})

app.post("/wiki/:title/delete", async (req, res) => {
    await Mongo.deletePage(req.params.title);
    res.redirect("/");
})