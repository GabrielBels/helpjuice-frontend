
// Change the <textarea> placeholder for Heading, when typed /1
function changeTextAreaPlaceholder(isAppendClass) {
    if (isAppendClass) {
        var txt = $("#mainNotes").val();

        var textBeforeBar = txt.substr(0, txt.indexOf("/"));

        if (textBeforeBar)
            createParagraphBeforeTextArea(textBeforeBar.replaceAll("\n", "<br>"));

        $("#mainNotes")
            .addClass("headerTextArea")
            .attr("placeholder", "Header")
            .attr("is-writing-header", "1")
            .val("");
    }
    else {
        $("#mainNotes")
            .removeClass("headerTextArea")
            .attr("placeholder", "Type / for blocks, @ to link docs or people")
            .attr("is-writing-header", "0");
    }
}

// Create a Header above the textarea
function createHeaderBeforeTextArea(txt) {
    $("#divHeaders").append(`<h1 class="text-4xl font-bold">${txt}</h1>`);
}

// Create a paragraph above the textarea
function createParagraphBeforeTextArea(txt) {
    $("#divHeaders").append(`<p>${txt}</p>`);
}

// Check if is current creating a Header
function checkIsWritingHeader() {
    return $("#mainNotes").attr("is-writing-header") == "1" ? true : false;
}

// Delete the most recent Header
function deleteLastHeader() {
    var lastH1 = $("#divHeaders").children().last();

    if (!lastH1)
        return;

    var tagName = lastH1.prop("tagName");
    var elementText = "";

    if (tagName == "H1") {
        var h1 = $("#divHeaders").children("h1").last();
        elementText = h1.html();

        h1.remove();
        changeTextAreaPlaceholder(true);
    } else {
        var p = $("#divHeaders").children("p").last();
        elementText = p.html();

        p.remove();
        changeTextAreaPlaceholder(false);
    }

    $("#mainNotes").val(elementText.replaceAll("<br>", "\n"));
}

// Check if the <textarea> contains only the command "/"
function checkIsBar(txt) {
    if (!txt || (txt.length == 1 && txt.trim().substr(0, 1) == "/")
        || txt.substr(txt.length - 1) == "/")
        return true;
    else
        return false;
}

function checkHasTransformHeader(txt) {
    // if txt begins with "/" or txt begins with "/1"
    if (txt.substr(txt.length - 2) == "/1")
        return true;
    else
        return false;
}

// Calculate position of the help block (margin-left = length * 0.6) rem
function setHelpBlockPosition() {
    var numberLinesTextArea = parseInt(getLinesQuantity("#mainNotes"));
    var lastLineTextAreaLength = getElementLastLine("#mainNotes").length;

    // 10rem to the start of writing position + 0.5 each character 
    var marginLeft = 10 + (lastLineTextAreaLength * 0.5);

    // 12rem to the start of writing position + 1.5 each line
    var marginTop = 12;

    if (numberLinesTextArea > 1)
        marginTop += numberLinesTextArea * 1.5

    var h1Quantity = $("#divHeaders h1").length;

    if (h1Quantity > 0)
        marginTop += h1Quantity * 2.5

    $("#helpBlock").css({ 'top': `${marginTop}em`, 'left': `${marginLeft}em` });
}

// Get the length of determined element according with the selector parameter
function getElementLength(selector) {
    return $(selector).val().length;
}

// Get the last line of determined element according with the selector parameter
function getElementLastLine(selector) {
    var text = $(selector).val();

    // Split by break line, will return an array 
    var lines = text.split(/\r|\r\n|\n/);

    return lines[lines.length - 1];
}

// Get lines quantity of determined element according with the selector parameter
function getLinesQuantity(selector) {
    var text = $(selector).val();

    // Split by break line, will return an array 
    var lines = text.split(/\r|\r\n|\n/);

    // Count array positions
    var count = lines.length;

    return count;
}
