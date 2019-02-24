import {Post} from "./request";
import quill from "./quill";

$("#edit").click(onEditClick);

async function onEditClick() {
    let title = $("#title")[0].textContent;
    title = title.substring(title.indexOf(" ") + 1, title.length);
    console.log(title);
    
    let req = new Post(`/wiki/${title}/edit`);
    req.data = {
        html: quill.getHtml(),
        raw: quill.getText(),
        delta: quill.getContents()
    };
    let resp = await req.send();
    console.log(resp);
    window.location.href = resp.url;
}