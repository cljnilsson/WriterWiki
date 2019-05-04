const
    mongoose = require('mongoose'),
    path = require("path"),
    fs = require("fs"),
    schemas = require("./schemas/schemas");

require('dotenv').config({path: path.join(__dirname, '../../.env')});

mongoose.connect(process.env.DB_URL, {
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    useNewUrlParser: true
});

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

class Model {
    static get page() {
        return mongoose.model("pages", schemas.get("page"));
    }
}

class Mongo {
    static async getAllPages() {
        let model = Model.page;
        let all = await model.find({});
        return all;
    }

    static async makePage(title, html, delta, raw, version) {
        let model = Model.page;

        let page = new model({
            title: title,
            html: html,
            delta: JSON.stringify(delta),
            raw: raw,
            version, version
        });
        await page.save();
        return page;
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