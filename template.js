
/**
 * 
 * @param { string } str 
 * @param {*} locale 
 */
function localizeString(str, locale, path = "") {
    let parsedStr = str;
    for(key in locale) {
        if(typeof locale[key] === 'string') {
            parsedStr = parsedStr.replaceAll("{{" + path + key + "}}", locale[key]);
        } else if (typeof locale[key] === 'object') {
            parsedStr = localizeString(parsedStr, locale[key], key + ".");
        }
    }
    return parsedStr;
}

function renderPage(src, lang = "en") {
    fetch(src).then(res => res.text()).then(async content => {
        const langRes = await fetch(lang + '.json');
        const locale = await langRes.json();
        const parsedContent = localizeString(content, locale);
        document.querySelector('body').innerHTML = parsedContent;
    })
}