var year, hash, length;
var currentRow = -1;
var input = "";

function updateCellClasses(cellClasses, correct) {
    let row = $("#tiles tr").eq(currentRow);
    let cells = row.children();
    for (let i = 0; i < length; ++i) {
        setTimeout(function() {
            cells.eq(i).removeClass();
            cells.eq(i).addClass(correct ? "jump" : "animate");
            if (cellClasses[i] === undefined) {
                cells.eq(i).addClass("cell-incorrect");
            } else {
                cells.eq(i).addClass(cellClasses[i]);
            }
            setTimeout(function() {
                cells.eq(i).removeClass(correct ? "jump" : "animate");
            }, 500);
        }, 300);
    }
}

function displayWinMessage() {
    let message = "You won ";
    if (currentRow == 0) {
        message += "first try!";
    } else {
        message += `in ${currentRow + 1} tries!`;
    }
    message += `<br><br>Reload the page to play again!`;
    setTimeout(function() {
        $("#center-box").addClass("content").html(message);
    }, 1000);
}

function checkGuess(hash, guess) {
    console.log("Checking guess", hash, guess);
    var result;
    $.ajax({
        url: "http://localhost:5000/check",
        type: "POST",
        crossDomain: true,
        async: false,
        data: JSON.stringify({hash: hash, event: guess}),
        contentType: "application/json",
        dataType: "json",
        success: function(data) {
            result = data;
        }
    });
    let correct = result.correct;
    let correct_indexes = result.correct_indexes;
    let wrong_places = result.wrong_places;
    let cellClasses = [...Array(length)];
    for (let i = 0; i < correct_indexes.length; ++i) {
        cellClasses[correct_indexes[i]] = "cell-correct";
    }
    for (let i = 0; i < wrong_places.length; ++i) {
        cellClasses[wrong_places[i][0]] = "cell-wrong-place";
    }
    updateCellClasses(cellClasses, correct);
    if (correct) {
        displayWinMessage();
    }
    return correct;
}

function addRow() {
    let table = $("#tiles");
    let cell = $("<td></td>").addClass("cell-blank").text(" ");
    let row = $("<tr></tr>");
    for (let i = 0; i < length; ++i) {
        row.append(cell.clone());
    }
    table.append(row);
    ++currentRow;
}

function updateInput() {
    console.log("Updating input", input);
    let row = $("#tiles tr").eq(currentRow);
    let cells = row.children();
    for (let i = 0; i < input.length; ++i) {
        cells.eq(i).text(input[i]);
    }
    for (let i = input.length; i < length; ++i) {
        cells.eq(i).text(" ");
    }
}

$(document).ready(function() {
    console.log("ready!");

    // Get the event
    $.ajax({
        url: "http://localhost:5000/get_event",
        type: "GET",
        crossDomain: true,
        async: false,
        dataType: "json",
        success: function(data) {
            year = data.year;
            hash = data.hash;
            length = data.length;
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });

    $("#year").text(`Year: ${year}`);

    console.log(year, hash, length);

    addRow(); // Add the first row

    document.addEventListener("keydown", function(event) {
        const key = event.key;
        if (key === "Backspace" || key === "Delete") {
            input = input.slice(0, -1);
        } else if (key === "Enter") {
            if (input.length === length) {
                if (!checkGuess(hash, input)) {
                    input = "";
                    addRow();
                }
            }
        } else {
            if (input.length < length && key.length === 1) {
                input += key.toLowerCase();
                input = input.slice(0, length);
            }
        }
        updateInput();
    });
});
