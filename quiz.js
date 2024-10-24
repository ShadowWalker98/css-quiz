console.log("Welcome to my quiz!");

const questions = [
    {
        question: "What does CSS stand for?",
        options: [
            "Creative Style Sheets",
            "Cascading Style Sheets",
            "Computer Style Sheets",
            "Colorful Style Sheets"
        ],
        answer: 1
    },
    {
        question: "Which property is used to change the background color of an element?",
        options: [
            "color",
            "background-color",
            "bgcolor",
            "background"
        ],
        answer: 1
    },
    {
        question: "Which CSS property controls the text size?",
        options: [
            "font-size",
            "text-size",
            "font-weight",
            "text-style"
        ],
        answer: 0
    },
    {
        question: "How do you make the text bold in CSS?",
        options: [
            "font-style: bold",
            "font-weight: bold",
            "text-weight: bold",
            "font: bold"
        ],
        answer: 1
    },
    {
        question: "Which is the correct CSS syntax to select an element by its ID?",
        options: [
            ".idname { }",
            "#idname { }",
            "*idname { }",
            "idname { }"
        ],
        answer: 1
    },
    {
        question: "What is the default value of the position property?",
        options: [
            "relative",
            "fixed",
            "absolute",
            "static"
        ],
        answer: 3
    },
    {
        question: "Which property is used to change the font of an element?",
        options: [
            "font-family",
            "font-style",
            "font-weight",
            "font-size"
        ],
        answer: 0
    },
    {
        question: "How do you make each word in a text start with a capital letter?",
        options: [
            "text-transform: capitalize",
            "text-transform: uppercase",
            "text-transform: lowercase",
            "text-transform: capitalize-each"
        ],
        answer: 0
    },
    {
        question: "Which property is used to add space between the content and the border of an element?",
        options: [
            "margin",
            "border-spacing",
            "padding",
            "spacing"
        ],
        answer: 2
    },
    {
        question: "How do you select all elements of a given type in CSS?",
        options: [
            "* { }",
            ".classname { }",
            "tagname { }",
            "#idname { }"
        ],
        answer: 2
    }    
];

let selectedOptions;

function getQuestionContainer() {
    return document.querySelector(".question-text");
}

function getOptionsContainer() {
    return document.querySelector(".options-container");
}

function getRadioButtonContainer() {
    let radioButtonContainer = document.createElement("div");
    radioButtonContainer.classList.add("radio-option");
    return radioButtonContainer;
}

function addOption(container, optionText, idx) {
    let radioButton = document.createElement("input");
    radioButton.classList.add("option-button");
    radioButton.type = "radio";
    radioButton.name = "options-group";
    radioButton.id = "option-" + idx;
    radioButton.value = idx;
    if(idx === selectedOptions[currentQuestion - 1]) {
        radioButton.checked = true;
    }

    radioButton.addEventListener("click", function markSelected() {
        selectedOptions[currentQuestion - 1] = idx;
    });

    let radioButtonLabel = document.createElement("label");
    radioButtonLabel.classList.add("option-label");
    radioButtonLabel.htmlFor = radioButton.id;
    radioButtonLabel.textContent = optionText;
    container.appendChild(radioButton);
    container.appendChild(radioButtonLabel);
}

function addOptions(container, options) {
    for(let i = 0; i < options.length; i++) {
        let radioButtonContainer = getRadioButtonContainer();
        addOption(radioButtonContainer, options[i], i);
        container.appendChild(radioButtonContainer);
    }
}

let totalQuestions = questions.length;
let currentQuestion = 1;
let questionContainer;
let optionsContainer;

function removeOptions() {
    while(optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.lastChild);
    }
}

function disableOptions() {
    const radioButtons = document.querySelectorAll(".option-button");
    radioButtons.forEach(function disable(radioButton) {
        radioButton.disabled = true;
    });
}

function highlightOptions(selected, answer) {
    
    if(selected === -1) {
        alert("Please select an option");
        return;
    }

    let optionButtonRefs = document.querySelectorAll(".option-button");
    let optionLabelRefs = document.querySelectorAll(".option-label");

    if(selected === answer) {
        optionButtonRefs[[selected]].classList.add("correct");
        optionLabelRefs[[selected]].classList.add("correct");
    } else {
        optionButtonRefs[selected].classList.add("incorrect");
        optionButtonRefs[answer].classList.add("correct");
        optionLabelRefs[[selected]].classList.add("incorrect");
        optionLabelRefs[[answer]].classList.add("correct");
    }
    disableOptions();
}

function changeQuestion() {
    questionContainer.innerText = questions[currentQuestion - 1]["question"];
}

function initButtons() {
    let previousButtonRef = document.querySelector(".previous");
    previousButtonRef.addEventListener("click", () => {
        if(currentQuestion > 1) {
            currentQuestion -= 1;
            changeQuestion();
            removeOptions();
            addOptions(optionsContainer, questions[currentQuestion - 1]["options"]);
        }
    });

    let checkButtonRef = document.querySelector(".check");
    checkButtonRef.addEventListener("click", () => {
        let userAnswer = getSelectedRadioButton();
        let correctAnswer = questions[currentQuestion - 1]["answer"];
        highlightOptions(userAnswer, correctAnswer);
    });

    let nextButtonRef = document.querySelector(".next");
    nextButtonRef.addEventListener("click", () => {
        if(currentQuestion + 1 <= questions.length) {
            removeOptions();
            currentQuestion += 1;
            changeQuestion();
            addOptions(optionsContainer, questions[currentQuestion - 1]["options"]);
        }
    });
}

function getSelectedRadioButton() {
    let selected = -1;
    let radioButtonRefs = document.querySelectorAll(".option-button");
    for(let i = 0; i < radioButtonRefs.length; i++) {
        if(radioButtonRefs[i].checked) selected = i;
    }
    return selected;
}

function init() {
    selectedOptions = new Array(questions.length).fill(-1);
    questionContainer = getQuestionContainer();
    questionContainer.innerText = questions[currentQuestion - 1]["question"];
    optionsContainer = getOptionsContainer();
    addOptions(optionsContainer, questions[currentQuestion - 1]["options"]);
    initButtons();
}



init();
