export default function getRefs() {
    return {
    form: document.querySelector('#search-form'),
    input: document.querySelector('#search-form input'),
    btnSubmit: document.querySelector('#search-form button'),
        watchedBtn: document.querySelector('#header-btm-watched'),
        queueBtn: document.querySelector('#header-btm-queue'),

    ul: document.querySelector('.films-collection')
}
}