import "./js/quill";
import "./js/create";
import "./js/edit";

$("#search").keyup(onType);

let selection = 0;
let currentOptions = [];

function onType(event) {
    switch(event.which) {
        case 13:
            window.location.href = "/wiki/" + $(currentOptions[selection])[0].textContent;
        break;

        case 38:
            selection--;
        break;

        case 40:
            selection++;
        break;

        default:
            filter();
        break;
    }

    if(selection < 0) {
        selection = 0;
    } else if(selection > currentOptions.length) {
        selection = currentOptions.length;
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
                currentOptions.filter(item => item === o);
            }
        }
    }
}