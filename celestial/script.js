/* Merritt Zamboni */

"use strict";

/* global variables */
var formValidity = true;
// shortened getElementById function
var $ = function(id) { return document.getElementById(id); };

/* validate required fields */
function validateRequired() {
	var requiredElements = document.querySelectorAll("#first-name-field,#last-name-field,textarea");
	var contactMethod = document.querySelectorAll("input[type='radio']");
	var contactMethodStyle = document.getElementsByClassName("radio");
	var emailField = $("email-field");
	var phoneField = $("phone-field");
	var errorMsg = $("error-text");
	var requiredValidity = true;
	var currentElement;
	try {
		// validate first name, last name, and message fields
		for (var i = 0; i < requiredElements.length; i++) {
			currentElement = requiredElements[i];
			if (currentElement.value === "") {
				currentElement.style.outline = "2px solid #ff2e2e";
				currentElement.style.background = "#fff0f0";
				requiredValidity = false;
			} else {
				currentElement.style.outline = "";
				currentElement.style.background = "";
			}
		}
		// verify that a contact method is selected
		if (!contactMethod[0].checked && !contactMethod[1].checked) {
			contactMethodStyle[0].style.border = "2px solid #ff2e2e";
			contactMethodStyle[1].style.border = "2px solid #ff2e2e";
			contactMethodStyle[0].style.background = "#fff0f0";
			contactMethodStyle[1].style.background = "#fff0f0";
			requiredValidity = false;
		} else {
			contactMethodStyle[0].style.border = "";
			contactMethodStyle[1].style.border = "";
			contactMethodStyle[0].style.background = "";
			contactMethodStyle[1].style.background = "";
		}
		// email address required if email contact is selected
		if (contactMethod[0].checked && emailField.value === "") {
			emailField.style.outline = "2px solid #ff2e2e";
			emailField.style.background = "#fff0f0";
			requiredValidity = false;
		} else {
			emailField.style.outline = "";
			emailField.style.background = "";
		}
		// phone number required if phone contact is selected
		if (contactMethod[1].checked && phoneField.value === "") {
			phoneField.style.outline = "2px solid #ff2e2e";
			phoneField.style.background = "#fff0f0";
			requiredValidity = false;
		} else if (contactMethod[1].checked && isNaN(phoneField.value)) {
			phoneField.style.outline = "2px solid #ff2e2e";
			phoneField.style.background = "#fff0f0";
			requiredValidity = false;
			throw "Phone number field can only contain numbers.";
		} else {
			phoneField.style.outline = "";
			phoneField.style.background = "";
		}
		if (requiredValidity === false) {
			throw "Please complete all highlighted fields.";
		}
		errorMsg.style.display = "none";
		errorMsg.innerHTML = "";
	}
	catch(msg) {
		errorMsg.style.display = "block";
		errorMsg.innerHTML = msg;
		formValidity = false;
	}
}

/* switch between product categories */
$("btn1").onclick = function() {
	//add current-btn class to btn1, remove class from other buttons
	$("btn1").classList.add("current-btn");
	$("btn2").classList.remove("current-btn");
	$("btn3").classList.remove("current-btn");
	// show holiday tea category, hide other categories
	$("holiday").style.display = "block";
	$("hot").style.display = "none";
	$("iced").style.display = "none";
}
$("btn2").onclick = function() {
	//add current-btn class to btn2, remove class from other buttons
	$("btn1").classList.remove("current-btn");
	$("btn2").classList.add("current-btn");
	$("btn3").classList.remove("current-btn");
	// show hot tea category, hide other categories
	$("holiday").style.display = "none";
	$("hot").style.display = "block";
	$("iced").style.display = "none";
}
$("btn3").onclick = function() {
	//add current-btn class to btn3, remove class from other buttons
	$("btn1").classList.remove("current-btn");
	$("btn2").classList.remove("current-btn");
	$("btn3").classList.add("current-btn");
	// show iced tea category, hide other categories
	$("holiday").style.display = "none";
	$("hot").style.display = "none";
	$("iced").style.display = "block";
}

/* toggle dark mode */
$("darkmode-btn").onclick = function() {
	var darkmodeElements = document.querySelectorAll("section,header,footer,div,input,textarea,button");
	for (var i = 0; i < darkmodeElements.length; i++) {
		// toggle darkmode class
		darkmodeElements[i].classList.toggle("darkmode");
		// change button text depending on current mode
		if ($("darkmode-btn").innerHTML !== "Light Mode") {
			$("darkmode-btn").innerHTML = "Light Mode";
		} else {
			$("darkmode-btn").innerHTML = "Dark Mode";
		}
	}
}

/* create event listeners */
function createEventListeners() {
	var form = document.getElementsByTagName("form")[0];
	if (form.addEventListener) {
		form.addEventListener("submit", validateForm, false);
	} else if (form.attachEvent) {
		form.attachEvent("onsubmit", validateForm);
	}
}

/* validate form */
function validateForm(evt) {
	if (evt.preventDefault) {
		// prevent form from submitting
		evt.preventDefault(); 
	} else {
		// prevent form from submitting in IE8
		evt.returnValue = false; 
	}
	// reset value for revalidation
	formValidity = true; 
	validateRequired();
	if (formValidity === true) {
		// display submission confirmation
		var submissionMsg = $("submission-confirmation");
		var contactMethod = document.querySelectorAll("input[type='radio']");
		submissionMsg.innerHTML += "First name: " + $("first-name-field").value + "<br>";
		submissionMsg.innerHTML += "Last name: " + $("last-name-field").value + "<br>";
		submissionMsg.innerHTML += "Message: " + $("message-field").value + "<br>";
		if (contactMethod[0].checked) {
			submissionMsg.innerHTML += "Contact method: Email<br>";
		} else if (contactMethod[1].checked) {
			submissionMsg.innerHTML += "Contact method: Phone<br>";
		}
		if ($("email-field").value !== "") {
			submissionMsg.innerHTML += "Email address: " + $("email-field").value + "<br>";
		}
		if ($("phone-field").value !== "") {
			submissionMsg.innerHTML += "Phone number: " + $("phone-field").value + "<br>";
		}
		submissionMsg.style.display = "block";
	}
}

/* run create event listeners when page finishes loading */
if (window.addEventListener) {
	window.addEventListener("load", createEventListeners, false);
} else if (window.attachEvent) {
	window.attachEvent("onload", createEventListeners);
}