import {Post} from "./request";
import quill from "./quill";

$("#edit").click(onEditClick);
$("#delete").click(onDeleteClick);


function getTitle() {
    let title = $("#title")[0].textContent;
    return title.substring(title.indexOf(" ") + 1, title.length);
}

async function onEditClick() {
    let title = getTitle();
    let newTitle = $("#name")[0].value;
    console.log(newTitle);
    console.log(title);
    
    let req = new Post(`/wiki/${title}/edit`);
    req.data = {
        html: quill.getHtml(),
        raw: quill.getText(),
        delta: quill.getContents()
    };

    if(newTitle != title) {
        req.data.title = newTitle;
    }

    let resp = await req.send();
    console.log(resp);
    window.location.href = resp.url;
}

async function onDeleteClick() {
    let title = getTitle();
    let req = new Post(`/wiki/${title}/delete`);
    let resp = await req.send();
    console.log(resp.url)
    window.location.href = resp.url;
}