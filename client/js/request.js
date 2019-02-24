const url = "http://localhost:3000";

class Request {
    constructor(uri) {
        this.uri = uri;
    }
}

export class Get extends Request{
    constructor(uri) {
        super(uri);
    }

    async send() {
        return await fetch(url + this.uri);
    }
}

export class Post extends Request{
    constructor(uri) {
        super(uri);
    }

    get data() {
        return this._data;
    }
    set data(value) {
        this._data = value;
    }

    async send() {
        let data = await fetch(url + this.uri, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.data)
        });
        return data;
    }
}

export default Request;