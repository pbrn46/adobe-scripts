"use strict";
function main() {
    const selection = app.selection[0];
    if (!selection)
        return;
    if (!(selection instanceof Rectangle))
        return;
    const graphic = selection.graphics[0];
    if (!graphic)
        return;
    if (!(graphic instanceof Graphic))
        return;
    const filePath = graphic.itemLink.filePath;
    const link = graphic.itemLink;
    const pdf = link.parent;
    const pageNumber = pdf.pdfAttributes.pageNumber;
    var chosenPage = parseInt(prompt("Choose Page Number:", pageNumber.toString()));
    if (isNaN(chosenPage)) {
        alert("Invalid page number");
        return;
    }
    app.pdfPlacePreferences.pageNumber = chosenPage;
    graphic.place(filePath, false);
}
main();
