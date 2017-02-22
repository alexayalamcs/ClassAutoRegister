var crnNumbers = ["13679", "12083", "10092", "11056"];

var refreshDelay = 50;
var submitChangesDelay = 200;

var elementCrnTextbox = "CRN_IN";
var elementDropDownMenus = "RSTS_IN";
var elementButtons = "REG_BTN";
var waitlistValue = "WL";

// If we're on the main registration page, we 'try' to open the Add/Drop page.
if(isRegPage()) {
	setTimeout(function(){
		window.open("https://admin.wwu.edu/pls/wwis/bwskfreg.P_AltPin", "_self");
	}, refreshDelay);
}

// If we're not on the Add/Drop page, we go back a step.
if(notPermittedPage()) {
	setTimeout(function(){
		window.open("https://admin.wwu.edu/pls/wwis/twbkwbis.P_GenMenu?name=bmenu.P_RegMnu", "_self");
	}, refreshDelay);
}

if(isAddDropPage() && !isDone()) {
	// This loops through our crnNumbers array and fills in the corresponding boxes.
	for(var i = 0; i < crnNumbers.length; i++) {
		// Our element id is 'crn_idx' where x is a value from 1-10.
		// So since we're starting at i=0, we add 1 to our idValue
		var baseCrnName = "crn_id";
		var idValue = String(i + 1);
		var crnID = baseCrnName.concat(idValue);
		// We then set the text box value to match the corresponding crn numbers
		document.getElementById(crnID).setAttribute("value", crnNumbers[i]);
		
		hitSubmit();
	}
} else {
	// Local boolean that will be used down south.
	var submitAgain = false;

	// We scan for all rsts_in elements (drop down menus) and put them in an array
	var rstsElements = document.getElementsByName(elementDropDownMenus);
	for(var i = 0; i < rstsElements.length; i++) {
		var rstsElement = rstsElements[i];
		console.log(rstsElement.id)
		// After putting them in an array, we only care about the ones that are part of the ids 'action_id'
		if(rstsElement.id.indexOf('waitaction_id') != -1) {
			for(var j = 0; j < rstsElement.length; j++) {
				// Afterwards, we check to see if they contain a dropdown value corresponding to waitlisting
				var valueOption = rstsElement.options[j].value;
				if(valueOption == waitlistValue) {
					// If it does, we set the drop down menu option to that value.
					rstsElement.value = valueOption;
					// We then flag it so that we can submit it again
					submitAgain = true;
				}
			}
		}
	}
	
	if (submitAgain) {
		hitSubmit();
	}
}

// We know we're on the generic registration page if the document title matches "Registration"
function isRegPage() {
	var title = document.title;
	return (title == "Registration");
}

// We determine if we're on the "Not Permitted" page if we're seeing the following message on the document.
function notPermittedPage() {
	var result = document.documentElement.innerHTML.indexOf('You are not permitted to register at this time.');
	return (result != -1);
}

// We determine if we're on the actual registration page if we see the following text.
function isAddDropPage() {
	var result = document.documentElement.innerHTML.indexOf('Add Classes Worksheet');
	return (result != -1);
}

// This is overly complicated...
// So essentially, we search for all filled in elements by the name of "CRN_IN" and record all numbers that are 5 in length (CRNs) in an array.
// After we create that array, we check that all the values in our crnNumbers array is in the crnValues array.
// If we're missing even just 1, we'll return false to signify that we need to fill in our boxes and hit submit.
function isDone() {
	var crnInElements = document.getElementsByName(elementCrnTextbox);
	var crnValues = [];
	for(var i = 0; i < crnInElements.length; i++) {
		var crnInElement = crnInElements[i];
		var value = crnInElement.value;
		if (value.length == 5 && !isNaN(value)) {
			crnValues.push(value);
		}
	}
	
	for(var i = 0; i < crnNumbers.length; i++) {
		if (crnValues.indexOf(crnNumbers[i]) == -1) {
			return false;
		}
	}
	return true;
}

function hitSubmit() {
	// The submit elements don't have ids tied to them, so we look them up by their names.
	var submitElements = document.getElementsByName(elementButtons);

	// Once we find all the submit elements, we cycle through to find the submit changes button
	for(var i = 0; i < submitElements.length; i++) {
		var inputElement = submitElements[i];
		if (inputElement.value == 'Submit Changes') {
			// We then submit our changes after a delay
			setTimeout(function(){
				inputElement.click();
			},submitChangesDelay);
			break;
		}
	}
}