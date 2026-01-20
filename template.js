function renderPage(src) {
    fetch(src).then(res => res.text()).then(content => {
        document.querySelector('body').innerHTML = content;
    })
}