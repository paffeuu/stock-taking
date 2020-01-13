const reportTypes = [
    "Zestawienie książek należących do księgozbioru - ",
    "Zestawienie książek należących do biblioteki",
    "Zestawienie książek aktualnie wypożyczonych w księgozbiorze - ",
    "Zestawienie książek aktualnie wypożyczonych w bibliotece",
    "Zestawienie księgozbiorów należących do zasobów biblioteki"
];

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

function onReportGenerated(type, bookCollectionName) {
    let reportGeneratedContainer = document.getElementById("report-generated-container");
    reportGeneratedContainer.style.display = "initial";
    let tableLabel = document.getElementById("table-label");
    tableLabel.textContent = reportTypes[type] + bookCollectionName;
    setTimeout(() => {
        let successTexts = document.getElementsByClassName("success-text");
        successTexts[0].style.display = "none";
    }, 3000);
}

function generateReportBooks(forLibrary) {
    let reportBooksTable = document.getElementById("report-books-table");
    reportBooksTable.style.display = "initial";
    let bookCollectionName;
    if (!forLibrary) {
        let bookCollectionSelect = document.getElementById("bookcollection");
        let index = bookCollectionSelect.options.selectedIndex;
        bookCollectionName = bookCollectionSelect.options[index].textContent;
    }
    if (document.getElementById("report-type").options.selectedIndex == 0) {
        if (forLibrary) {
            onReportGenerated(1, "");
            loadAllBooks(false);
        } else {
            onReportGenerated(0, bookCollectionName);
            loadBooksByBookCollectionId(false);
        }
    } else {
        if (forLibrary) {
            onReportGenerated(3, "");
            loadAllBooks(true);
        } else {
            onReportGenerated(2, bookCollectionName);
            loadBooksByBookCollectionId(true);
        }
    }
}

function generateReportBookCollections() {
    onReportGenerated(4, "");
    let reportBookCollectionsTable = document.getElementById("report-bookcollections-table");
    reportBookCollectionsTable.style.display = "initial";
    loadBookCollections(true);
}

function loadBookCollections(table) {
    fetch('/bookCollection/get', { mode: 'no-cors'})
        .then((response) => response.json())
        .then((json) => {
            if (table) {
                fillTableWithBookCollections(json);
            } else {
                fillBookCollectionsSelect(json);
            }
        })
}

function loadBooksByBookCollectionId(checkedOut) {
    let bookCollectionId = document.getElementById("bookcollection").options.selectedIndex;
    let url;
    if (checkedOut) {
        url = '/book/get/' + bookCollectionId + '/checkedOut/';
    } else {
        url = '/book/get/'
    }
    fetch(url, { mode: 'no-cors' })
        .then((response) => response.json())
        .then((json) => fillTableWithBooks(json));
}

function loadAllBooks(checkedOut) {
    let url;
    if (checkedOut) {
        url = '/book/get/checkedOut';
    } else {
        url = '/book/get'
    }
    fetch(url, { mode: 'no-cors' })
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
        let checkedOutCell = document.createElement('td');
        checkedOutCell.textContent = json[i].checkedOut;
        row.append(idCell, titleCell, authorCell, publisherCell, publicationDateCell, checkedOutCell);
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
    let table;
    let booksTable = document.getElementById("report-books-table");
    if (booksTable.style.display != "") {
        table = booksTable;
    } else {
        table = document.getElementById("report-bookcollections-table");
    }
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
            link.download = "report.html";
            document.body.appendChild(link);
            link.click();
            setTimeout(function() {
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);  
            }, 0);
        
            alert("Raport zapisany!");
        });
}
