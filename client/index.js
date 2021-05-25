import "./js/quill";
import "./js/create";
import "./js/edit";
import "./js/request";
import { Post } from "./js/request";
import "quill/dist/quill.snow.css";


$("#search").keyup(onType);
$(".option").click(onOptionClick);
$("#backup").click(onBackupClick);

let selection = 0;
let currentOptions = [];

function onOptionClick() {
    window.location.href = "/wiki/" + $("#wikiname").text() + "/" + $(this)[0].textContent;
}

function onType(event) {
    switch(event.which) {
        case 13:
            window.location.href = "/wiki/" + $(currentOptions[selection])[0].textContent;
        break;

        case 38:
            selection--;
            if(selection < 0) {
                selection = 0;
            }
        break;

        case 40:
            selection++;
            if(selection >= currentOptions.length) {
                selection = currentOptions.length - 1;
            }
        break;

        default:
            filter();
        break;
    }

    if(currentOptions.length > 0) {
        for(let o of currentOptions) {
            $(o).removeClass("active");
        }
        $(currentOptions[selection]).addClass("active");
    }
}

function filter() {
    let bar = $("#search")[0].value.toLowerCase();
    let options = $("#suggestions");
    let children = options[0].children;
    let count = 0;

    for(let o of children) {
        let text = o.textContent.toLowerCase();
        
        if(bar === "") {
            $(o).hide();
        } else {
            if(text.includes(bar) === true) {
                count++;
                $(o).show();
                if(currentOptions.includes(o) === false) {
                    currentOptions.push(o);
                }
                if(count >= 4) {
                    break;
                }
            } else {
                $(o).hide();
                currentOptions = currentOptions.filter(item => item !== o);
            }
        }
    }
}

function onBackupClick() {
    console.log("click");
    new Post("/backup").send();
}