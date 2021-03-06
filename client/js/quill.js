let exists = document.querySelector("#editor");

Quill.prototype.getHtml = function() {
    return this.container.firstChild.innerHTML;
};

if(exists) {
    let options = [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote'],
    
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
    
        
        [{ 'color': [] }, { 'background': [] }],
        
        [{align: ''}, {align: 'right'}, {align: 'center'}, {align: 'justify'}],
    ];
    
    var quill = new Quill('#editor', {
        modules: { toolbar: options},
        placeholder: 'Compose an epic...',
        theme: 'snow'
    });
}

export default quill;