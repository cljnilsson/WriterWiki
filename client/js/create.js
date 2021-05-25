import {Post} from "./request";
import quill from "./quill";

$("#write").click(onWriteClick);

async function onWriteClick() {
	let name = $("#name")[0].value;
	let wiki = $("#wikiname").text();
	console.log(wiki);
	console.log(name);
	console.log("/wiki/" + wiki +"/createPage");
    let req = new Post("/wiki/" + wiki +"/createPage");
    req.data = {
        title: name,
        html: quill.getHtml(),
        raw: quill.getText(),
        delta: quill.getContents(),
        version: 1
    };
    let resp = await req.send();
    window.location.href = resp.url;
}