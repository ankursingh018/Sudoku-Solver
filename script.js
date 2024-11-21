const solveSudokuButton = document.getElementById('solve-sudoku');
const clearBoardButton = document.getElementById('clear-board');


let xmlHttpResponse;
let isStatus400;

function getSudokuBoard() {
    let request = '';
    isStatus400 = false;

    document.getElementsByName('quantity').forEach(input => {
        if (input.value.toString() !== "") {
            request = request.concat(input.id.toString(), input.value.toString());
        }
    });

    if (request === '') {
        alert("Enter data");
    } else {
        xmlHttpResponse = sendRequest(sudokuUrl + request);
        if (!isStatus400) {
            fillSudokuBoard();
        }
    }
};

function sendRequest(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.onreadystatechange = () => {
        if (xmlHttp.status === 400) {
            isStatus400 = true;
            alert("Incorrect sudoku init values.");
        }
    };
    xmlHttp.send(null);
    return xmlHttp.response;
}

function fillSudokuBoard() {
    let json = JSON.parse(xmlHttpResponse);
    for (var i = 0; i < json.sudokuRowDtoList.length; i++) {
        for (var j = 0; j < json.sudokuRowDtoList[i].sudokuElementDtoList.length; j++) {
            let element = document.getElementById((i + 1).toString() + (j + 1).toString());
            if (element.value !== null && element.value === '') {
                element.style.color = 'red';
                element.value = json.sudokuRowDtoList[i].sudokuElementDtoList[j].value;
            }
        }
    }
}

function clearBoard() {
    for (let i = 1; i < 10; i++) {
        for (let j = 1; j < 10; j++) {
            let val = document.getElementById(i.toString() + j.toString());
            val.value = "";
            val.style.color = 'black';
        }
    }
}

solveSudokuButton.onclick = function () { getSudokuBoard() };
clearBoardButton.onclick = function () { clearBoard() };
