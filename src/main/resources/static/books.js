function onSearchBooksClicked() {
    let menuListContainer = document.getElementById("menu-list-container");
    menuListContainer.style.display = "none";
    let searchFormContainer = document.getElementById("search-form-container");
    searchFormContainer.style.display = "initial";
    loadBookCollections();
}

function onSearchButtonClicked() {
    let book = extractSearchedDataFromSearchForm();
    fetch('/book/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    })
        .then((response) => console.log(response.text()));
    let searchFormContainer = document.getElementById("search-form-container");
    searchFormContainer.style.display = "none";
}

function loadBookCollections() {
    fetch('/bookCollection/get', { mode: 'no-cors'})
        .then((response) => response.json())
        .then((json) => fillBookCollectionsSelect(json));
}

function fillBookCollectionsSelect(json) {
    let bookCollectionsSelect = document.getElementById("bookcollection-book-input");
    json.forEach((entry) => bookCollectionsSelect.options.add(new Option(entry.name)));
}

function extractSearchedDataFromSearchForm() {
    let title = document.getElementById("title-book-input").value;
    let author = document.getElementById("author-book-input").value;
    let publisher = document.getElementById("publisher-book-input").value;
    let publicationYear = document.getElementById("publication-year-book-input").value;
    let bookCollectionId = document.getElementById("bookcollection-book-input").options.selectedIndex;
    let searchedData = {
        'title': title,
        'author': author,
        'publisher': publisher,
        //TODO - publicationYear/date
        'publicationDate': publicationYear,
        'bookCollection': {
            'id': bookCollectionId
        }
    }
    return searchedData;
}