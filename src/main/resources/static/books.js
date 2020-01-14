function onSearchBooksClicked() {
    let menuListContainer = document.getElementById("menu-list-container");
    menuListContainer.style.display = "none";
    let searchFormContainer = document.getElementById("search-form-container");
    searchFormContainer.style.display = "initial";
    loadBookCollections();
}

function onSearchButtonClicked() {
    let searchFormContainer = document.getElementById("search-form-container");
    searchFormContainer.style.display = "none";
}

function loadBookCollections() {
    fetch('/bookCollection/get', { mode: 'no-cors'})
        .then((response) => response.json())
        .then((json) => fillBookCollectionsSelect(json));
}

function fillBookCollectionsSelect(json) {
    let bookCollectionsSelect = document.getElementById("bookcollection");
    json.forEach((entry) => bookCollectionsSelect.options.add(new Option(entry.name)));
}