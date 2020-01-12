function onReportTypeSent() {
    let reportTypeContainer = document.getElementById("report-type-container");
    reportTypeContainer.style.display = "none";
    if (document.getElementById("report-type").options.selectedIndex == 2) {
        generateReportBookCollections();
    } else {
        let resourceTypeContainer = document.getElementById("resource-type-container");
        resourceTypeContainer.style.display = "initial";
    }
}

function onResourceTypeSent() {
    let resourceTypeContainer = document.getElementById("resource-type-container");
    resourceTypeContainer.style.display = "none";
    if (document.getElementById("resource-type").options.selectedIndex == 0) {
        let bookCollectionContainer = document.getElementById("bookcollection-container");
        bookCollectionContainer.style.display = "initial";
        loadBookCollections(false);
    } else {
        generateReportBooks(true);
    }
}

function onBookCollectionSent() {
    let bookCollectionContainer = document.getElementById("bookcollection-container");
    bookCollectionContainer.style.display = "none";
    generateReportBooks(false);
}

function onReportGenerated() {
    let reportGeneratedContainer = document.getElementById("report-generated-container");
    reportGeneratedContainer.style.display = "initial";
    setTimeout(() => {
        let successTexts = document.getElementsByClassName("success-text");
        successTexts[0].style.display = "none";
    }, 3000);
}

function generateReportBooks(forLibrary) {
    onReportGenerated();
    let reportBooksTable = document.getElementById("report-books-table");
    reportBooksTable.style.display = "initial";
    if (forLibrary) {
        loadAllBooks();
    } else {
        loadBooksByBookCollectionId();
    }
}

function generateReportBookCollections() {
    onReportGenerated();
    let reportBookCollectionsTable = document.getElementById("report-bookcollections-table");
    reportBookCollectionsTable.style.display = "initial";
    loadBookCollections(true);
}

function loadBookCollections(table) {
    fetch('/bookCollection/getAll', { mode: 'no-cors'})
        .then((response) => response.json())
        .then((json) => {
            if (table) {
                fillTableWithBookCollections(json);
            } else {
                fillBookCollectionsSelect(json);
            }
        })
}

function loadBooksByBookCollectionId() {
    let bookCollectionId = document.getElementById("bookcollection").options.selectedIndex;
    fetch('/book/get/' + bookCollectionId, { mode: 'no-cors' })
        .then((response) => response.json())
        .then((json) => fillTableWithBooks(json));
}

function loadAllBooks() {
    fetch('/book/getAll', { mode: 'no-cors' })
        .then((response) => response.json())
        .then((json) => fillTableWithBooks(json));
}

function fillBookCollectionsSelect(json) {
    let bookCollectionsSelect = document.getElementById("bookcollection");
    json.forEach((entry) => bookCollectionsSelect.options.add(new Option(entry.name)));
}

function fillTableWithBooks(json) {
    let table = document.getElementById("report-books-table");
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
        let publicationDateCell = document.createElement('td');
        publicationDateCell.textContent = json[i].publicationDate;
        row.append(idCell, titleCell, authorCell, publisherCell, publicationDateCell);
        table.append(row);
    }
}

function fillTableWithBookCollections(json) {
    let table = document.getElementById("report-bookcollections-table");
    for (let i = 0; i < json.length; i++) {
        let row = document.createElement('tr');
        let idCell = document.createElement('td');
        idCell.textContent = json[i].id;
        let nameCell = document.createElement('td');
        nameCell.textContent = json[i].name;
        let typeCell = document.createElement('td');
        typeCell.textContent = json[i].type;
        let sizeCell = document.createElement('td');
        sizeCell.textContent = json[i].size;
        let responsibleEmployeeCell = document.createElement('td');
        if (json[i].responsibleEmployee) {
            responsibleEmployeeCell.textContent = json[i].responsibleEmployee.lastName;
        }
        row.append(idCell, nameCell, typeCell, sizeCell, responsibleEmployeeCell);
        table.append(row);
    }
}

function saveReportToFile() {
    alert("Raport zapisany!")
}

