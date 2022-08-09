/*#################
## Story Tool
#################*/

const TABLE = document.getElementById("tool");

var rowPlace   = 1;
var rowTotal   = 0;
var rowObj     = [];
var groupObj   = [];
var groupTotal = 0;

//Group Designations
var titleGR 	   = null;
var introGR 	   = null;
var prereqsGR      = null;
var choiceLoaderGR = null;

var numChoices     = 1;
var choiceNameGR   = [];
var choiceBodyGR   = [];
var choicePrereqGR = [];
var choiceIllustGR = [];

function titleGroup() {
	titleGR = createGroup(1,1);

	let rowCursor = titleGR.headRow;

	rowObj[rowCursor].changeContent(1,"Event Title");
	rowObj[rowCursor].changeContent(2,"");

	rowCursor++;

	rowObj[rowCursor].changeContent(1,"Title:");
	rowObj[rowCursor].changeContent(2,"");

	rowCursor++;

	rowObj[rowCursor].changeContent(1,"");
	rowObj[rowCursor].changeContent(2,"");

	rowCursor++;

	rowObj[rowCursor].changeContent(1,"");
	rowObj[rowCursor].changeContent(2,"");
}

function introGroup() {
	introGR = createGroup(2,2);

	let rowCursor = introGR.headRow;

	rowObj[rowCursor].changeContent(1,"Introduction");
	rowObj[rowCursor].changeContent(2,"");

	rowCursor++;

	rowObj[rowCursor].changeContent(1,"Intro:");
	rowObj[rowCursor].changeContent(2,"<textarea id=\"intro\" rows=\"4\" cols=\"50\">Intro goes here.</textarea>");

	rowCursor++;

	rowObj[rowCursor].changeContent(1,"Intro Illustration:");
	rowObj[rowCursor].changeContent(2,"");

	rowCursor++;

	rowObj[rowCursor].changeContent(1,"");
	rowObj[rowCursor].changeContent(2,"");

	rowCursor++;

	rowObj[rowCursor].changeContent(1,"");
	rowObj[rowCursor].changeContent(2,"");
}

function prereqsGroup() {
	prereqsGR = createGroup(3,5);

	let rowCursor = prereqsGR.headRow;

	rowObj[rowCursor].changeContent(1,"Prerequisites");
	rowObj[rowCursor].changeContent(2,"");

	rowCursor++;

	rowObj[rowCursor].changeContent(1,"Requirement A:");
	rowObj[rowCursor].changeContent(2,"");

	rowCursor++;

	rowObj[rowCursor].changeContent(1,"AND");
	rowObj[rowCursor].changeContent(2,"");

	rowCursor++;

	rowObj[rowCursor].changeContent(1,"Requirement B:");
	rowObj[rowCursor].changeContent(2,"");

	rowCursor++;

	rowObj[rowCursor].changeContent(1,"OR");
	rowObj[rowCursor].changeContent(2,"");

	rowCursor++;

	rowObj[rowCursor].changeContent(1,"Requirement C:");
	rowObj[rowCursor].changeContent(2,"");

	rowCursor++;

	rowObj[rowCursor].changeContent(1,"");
	rowObj[rowCursor].changeContent(2,"");

	rowCursor++;

	rowObj[rowCursor].changeContent(1,"");
	rowObj[rowCursor].changeContent(2,"");
}

function choiceLoaderGroup() {
	choiceLoaderGR = createGroup(4,1);

	let rowCursor = choiceLoaderGR.headRow;

	console.log("rowCursor = " + rowCursor);

	rowObj[rowCursor].changeContent(1,"Choice Loader");
	rowObj[rowCursor].changeContent(2,"");

	rowCursor++;

	rowObj[rowCursor].changeContent(1,"Number of Choices");
	rowObj[rowCursor].changeContent(2,"");

	rowCursor++;

	rowObj[rowCursor].changeContent(1,"Submit Button");
	rowObj[rowCursor].changeContent(2,"");

	rowCursor++;

	rowObj[rowCursor].changeContent(1,"");
	rowObj[rowCursor].changeContent(2,"");
}

function createGroup(groupNum,span) {
	groupObj[groupNum] = {
		name: "empty",
		span: span,
		type: "empty",
		headRow: 1,
		footRow: 1,

		initialize: function() {
			createRow(rowPlace,"head");
			this.headRow = rowPlace;
			rowPlace ++;
			rowTotal ++;
			for (var i = 0; i < this.span; i++) {
				createRow(rowPlace,"body");
				rowPlace ++;
				rowTotal ++;
			}
			createRow(rowPlace,"foot");
			this.footRow = rowPlace;
			rowPlace ++;
			rowTotal ++;
			createRow(rowPlace,"spacer");
			rowPlace ++;
			rowTotal ++;
		}
	}
	groupObj[groupNum].initialize();

	return groupObj[groupNum];
}

function createRow(rowNum,type="body",name="empty") {
	//type: head; body; foot; spacer
	rowObj[rowNum] = {
		number: 	rowNum, 
		elem: 		null,
		name: 		name,
		


		cellA: 		null,
		contentA: 	"empty", 
		cellB: 		null,
		contentB: 	"empty",
		cellC: 		null,
		contentC: 	rowNum,

		createElem: function() {
			this.elem = TABLE.insertRow(rowNum);
		},

		deleteElem: function() {
			if (elem != null) {
				TABLE.deleteRow(nowNum);
			}
		},

		clearCell: function(cell) {
			//cell: 0 - All; 1 - A; 2 - B; 3 - C
			var currentCells = this.elem.cells.length;
			if (cell == 0) {
				console.log("Deleting all cells in Row " + this.number);
				while (currentCells != 0) {
					this.elem.deleteCell(0);
					currentCells = this.elem.cells.length;
				}
			} else if (currentCells >= cell) { 
				console.log("Deleting cell " + cell + " in Row " + this.number);
				this.elem.deleteCell(cell-1);
			} else {
				console.log("... (ꈍᴗꈍ)");
			}

		},

		addCell: function(cell) {
			//cell: 1 - A; 2 - B; 3 - C
			switch(cell) {
				case 1:
					this.clearCell(0);

					console.log("Row " + this.number + ", Cell " + cell);

					this.cellA = this.elem.insertCell(0);
					this.cellA.innerHTML = this.contentA;
					break;
				case 2: 
					this.clearCell(3);
					this.clearCell(2);

					console.log("Row " + this.number + ", Cell " + cell);

					this.cellB = this.elem.insertCell(1);
					this.cellB.innerHTML = this.contentB;
					break;
				case 3: 
					this.clearCell(3);

					console.log("Row " + this.number + ", Cell " + cell);

					this.cellC = this.elem.insertCell(2);
					this.cellC.innerHTML = this.contentC;
					break;
				default:
					alert("Something broke in the addCell method");
					break;
			}
		},

		changeContent: function(cell,content) {
			switch(cell) {
				case 1:
					if (this.cellA == null) {
						alert("Cell A does not exist.");
						break;
					}
					this.contentA = content;
					this.cellA.innerHTML = content;
					break;
				case 2:
					if (this.cellB == null) {
						alert("Cell B does not exist.");
						break;
					}
					this.contentB = content;
					this.cellB.innerHTML = content;
					break;
				case 3:
					if (this.cellC == null) {
						alert("Cell C does not exist.");
						break;
					}
					this.contentC = content;
					this.cellC.innerHTML = content;
					break;

			}
		}


	}
	rowObj[rowNum].createElem();
	if (type != undefined) {
		let rowClass = "row_" + type;
		rowObj[rowNum].elem.setAttribute("class",rowClass);
		console.log("Row " + rowNum + " Class :  " + rowClass);
	}
	rowObj[rowNum].addCell(1);
	rowObj[rowNum].addCell(2);
	rowObj[rowNum].addCell(3);
}

// createRow(1,"head");
// //console.log(JSON.stringify(rowObj[1], null, 4));


titleGroup();
introGroup();
prereqsGroup();
choiceLoaderGroup();