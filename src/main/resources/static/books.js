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
        .then((response) => response.json())
        .then((json) => fillTableWithBooks(json));
    let searchFormContainer = document.getElementById("search-form-container");
    searchFormContainer.style.display = "none";
    let searchResultsContainer = document.getElementById("search-results-container");
    searchResultsContainer.style.display = "initial";
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
        'publicationYear': publicationYear,
        'bookCollection': {
            'id': bookCollectionId
        }
    }
    return searchedData;
}

function fillTableWithBooks(json) {
    let table = document.getElementById("search-results-table");
    for (let i = 0; i < json.length; i++) {
        let row = document.createElement('tr');
        let idCell = document.createElement('td');
        idCell.textContent = json[i].id;
        let titleCell = document.createElement('td');
        titleCell.textContent = json[i].title;
        let authorCell = document.createElement('td');
        authorCell.textContent = json[i].author;
        let publisherCell = document.createElement('td');
        publisherCell.textContent = json[i].publisher;
        let publicationYearCell = document.createElement('td');
        publicationYearCell.textContent = json[i].publicationYear;
        let checkedOutCell = document.createElement('td');
        checkedOutCell.textContent = json[i].checkedOut;
        row.append(idCell, titleCell, authorCell, publisherCell, publicationYearCell, checkedOutCell);
        table.append(row);
    }
}

function saveReportToFile() {
    let table = document.getElementById("search-results-table");
    let label = document.getElementById("table-label");
    let html = label.outerHTML + table.outerHTML
    fetch('/print.css', {mode: 'no-cors'})
        .then(resp => resp.text())
        .then(tableStyle => {
            html = '<html><head><style>' + tableStyle + '</style><meta charset="UTF-8"></head><body>' 
                + html + "</body></html>"
            let file = new Blob([html], {type: "html"});
            let link = document.createElement("a");
            let url = URL.createObjectURL(file);
            link.href = url;
            link.download = "results.html";
            document.body.appendChild(link);
            link.click();
            setTimeout(function() {
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);  
            }, 0);
        
            alert("Wyniki wyszukiwania zapisane!");
        });
}