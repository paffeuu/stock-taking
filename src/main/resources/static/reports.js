function onReportTypeSent() {
    let reportTypeContainer = document.getElementById("report-type-container");
    reportTypeContainer.style.display = "none";
    if (document.getElementById("report-type").options.selectedIndex == 2) {
        generateReport();
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
    } else {
        generateReport();
    }
}

function onBookCollectionSent() {
    let bookCollectionContainer = document.getElementById("bookcollection-container");
    bookCollectionContainer.style.display = "none";
    generateReport();
}

function generateReport() {
    let reportGeneratedContainer = document.getElementById("report-generated-container");
    reportGeneratedContainer.style.display = "initial";
    setTimeout(() => {
        let successTexts = document.getElementsByClassName("success-text");
        successTexts[0].style.display = "none";
    }, 3000)
}

function saveReportToFile() {
    alert("Raport zapisany!")
}
