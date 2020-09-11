const
    mongoose = require('mongoose'),
    path = require("path"),
    fs = require("fs"),
    schemas = require("./schemas/schemas");

require('dotenv').config({path: path.join(__dirname, '../../.env')});

mongoose.connect(process.env.DB_URL, {
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
	useNewUrlParser: true,
	useUnifiedTopology: true
});

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

class Model {
    static get page() {
        return mongoose.model("pages", schemas.get("page"));
	}
	
	static get wiki() {
        return mongoose.model("wiki", schemas.get("wiki"));
    }
}

(async () => {
	let all = await Model.wiki.find({});
	if(all.length == 0) {
		console.warn("No wikis founds in db, creating default");
		await Mongo.makeWiki("Auto-generated Wiki");
		console.log("Done");
	}
})();

(async () => {
	let all = await Model.page.find({});
	for(let i of all) {
		if(i.wiki == null) {
			console.log("Legacy wiki page " + i.title + " detected, setting connected wiki to first existing wiki");
			let model = Model.wiki;
			let first = await model.findOne({});
			i.wiki = first._id;
			i.save();
		}
	}
})();

class Mongo {
    static async getAllPages() {
        let model = Model.page;
        let all = await model.find({});
        return all;
	}
	
	static async getAllPagesFromWikiByName(name) {
		let wikimodel = Model.wiki;
		let pagemodel = Model.page;

		let wiki	  = await Mongo.getWikiByName(name);
		let all 	  = await pagemodel.find({wiki: wiki._id});
		
        return all;
    }

	static async getWikiByName(name) {
		let model = Model.wiki;
		return await model.findOne({name: name});
	}

	static async getWikiIdByName(name) {
		let wiki = await Mongo.getWikiByName(name);
		return wiki._id;
	}

    static async makePage(title, html, delta, raw, version, wiki) {
		let model = Model.page;
		let w = await Mongo.getWikiByName(wiki);
		let id = await Mongo.getWikiIdByName(wiki);

        let page = new model({
            title: title,
            html: html,
            delta: JSON.stringify(delta),
            raw: raw,
			version, version,
			wiki: id
        });
        await page.save();
        return page;
	}

	static async getAllWikis() {
        let model = Model.wiki;
        let all = await model.find({});
        return all;
    }
	
	static async makeWiki(name) {
        let model = Model.wiki;

        let wiki = new model({
			name: name
		});

        await wiki.save();
        return wiki;
    }

    static async deletePage(page) {
        let model = Model.page;
        model.deleteMany({title: page}, err => true);

        return true;
    }

    static async updateName(from, to) {
        let model = Model.page;
        let current = await model.findOne({title: from});

        current.title = to;

        await current.save();
        return current;
    }

    static async updatePage(title, html, delta, raw) {
        let model = Model.page;
        let current = await model.findOne({title: title});
        current.html = html;
        current.delta = JSON.stringify(delta);
        current.raw = raw;
        await current.save();
        return current;
    }

    static async getPage(title) {
        let model = Model.page;
        let data = await model.findOne({title: title});
        return data;
    }

    static async backup(name = "pages")  {
        let pages = await Mongo.getAllPages();
        pages = JSON.stringify(pages);

        fs.writeFile(`backup/${name}.json`, pages, "utf8", () => {});

        return true;
    }
}

(async function() {
    Mongo.backup("latest_pages");
})();

module.exports = Mongo;