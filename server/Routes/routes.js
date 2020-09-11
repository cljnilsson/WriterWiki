const
    app = require("../server.js").a;
    Mongo = require("../MongoDB/mongo"),
    path = require("path");


app.get("/", async (req, res) => {
    res.render("index", {wikis: await Mongo.getAllWikis()});
})

app.get("/createWiki", async (req, res) => {
    res.render("createwiki");
})

app.post("/createWiki", async (req, res) => {
	let name = req.body.wikiname;

	if(name) {
		console.log("make wiki " + name);
		Mongo.makeWiki(name);
	} else {
		console.error("Name was not sent");
	}

    res.redirect("/");
})


app.get("/wiki/:wiki", async (req, res) => {
	let all = await Mongo.getAllPagesFromWikiByName(req.params.wiki);
	console.log(all);
    res.render("wikiindex", {all: all, wiki: req.params.wiki, wikis: await Mongo.getAllWikis()});
})

app.get("/wiki/:wiki/createPage", (req, res) => {
    res.render("create", {wiki: req.params.wiki});
})

app.post("/wiki/:wiki/createPage", async function(req, res) {
    await Mongo.makePage(req.body.title, req.body.html, req.body.delta, req.body.raw, req.body.version, req.params.wiki);
   res.redirect(`/wiki/${req.params.wiki}/${req.body.title}`);
});

app.get("/wiki/:wiki/:title", async (req, res) => {
    let data = await Mongo.getPage(req.params.title);
    res.render("page", {html: data.html, title: data.title, wiki: req.params.wiki});
})

app.get("/wiki/:wiki/:title/edit", async (req, res) => {
    let data = await Mongo.getPage(req.params.title);
    res.render("edit", {html: data.html, title: data.title, wiki: req.params.wiki});
});

app.post("/wiki/:wiki/:title/edit", async (req, res) => {
    let title = req.params.title;

    if(req.body.title) {
        title = req.body.title;
        await Mongo.updateName(req.params.title, req.body.title);
    }

    await Mongo.updatePage(title, req.body.html, req.body.delta, req.body.raw);
    res.redirect(`/wiki/${req.params.wiki}/${title}`);
});

app.post("/backup", async (req, res) => {
    await Mongo.backup();
    res.status(200).send("Complete");
})

app.post("/wiki/:wiki/:title/delete", async (req, res) => {
    await Mongo.deletePage(req.params.title);
    res.redirect("/");
})