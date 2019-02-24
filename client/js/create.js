import {Post} from "./request";
import quill from "./quill";

$("#write").click(onWriteClick);

async function onWriteClick() {
    let name = $("#name")[0].value;
    console.log(name);
    let req = new Post("/createWiki");
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