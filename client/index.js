import "./css/main.css";

let options = [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],

    
    [{ 'color': [] }, { 'background': [] }],
    
    [{align: ''}, {align: 'right'}, {align: 'center'}, {align: 'justify'}],
];

var quill = new Quill('#editor', {
    modules: { toolbar: options},
    placeholder: 'Compose an epic...',
    theme: 'snow'  // or 'bubble'
  });