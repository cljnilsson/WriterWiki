const
    express     = require("express"),
    app         = express(),
    server      = require("http").createServer(app),
    bodyParser  = require("body-parser"),
    helmet      = require('helmet'),
    compression = require("compression"),
    path        = require('path');

function join(dir) {
    return path.join(__dirname, dir);
}

function header(req, res, next) {
    res.setHeader("Content-Security-Policy", "connect-src 'self' ws:");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}

class Server {
    get port() {
        return process.env.PORT || 3000;;
    }

    get url() {
        return this._url;
    }

    constructor() {
        this.dependencies()
        this.middleware();
        this.startup()
    }

    dependencies() {
        
    }

    middleware() {
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(header);
        app.use(helmet());
        app.use(bodyParser.json());
        app.use(compression());
        app.use(express.static(__dirname + "/../public"));
    }

    startup() {
        server.listen(this.port);
        console.log(`started on port ${this.port}`);
        //opn(`http://localhost:${this.port}`);
    }

}


let webServer = new Server();

module.exports.a = app;