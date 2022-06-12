export default function getRefs() {
    return {
    form: document.querySelector('#search-form'),
    input: document.querySelector('#search-form input'),
    btnSubmit: document.querySelector('#search-form button'),
    
    ul: document.querySelector('.films-collection')
}
}