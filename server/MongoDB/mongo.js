const
    mongoose = require('mongoose'),
    path = require("path"),
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
        console.log(all)
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
}

module.exports = Mongo;