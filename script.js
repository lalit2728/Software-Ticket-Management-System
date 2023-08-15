let allFilters = document.querySelectorAll(".filter div");
let grid = document.querySelector(".grid");
let addTicket = document.querySelector(".action > i");
let createTicket = document.querySelector(".create-ticket");
let cancelTicket = document.querySelector(".cancel-ticket-btn");
let ticketToChange = undefined;
let deleteState = false;
let editState = false;
let deleteBubble = document.querySelector(".delete-bubble");
let deleteBar = document.querySelector(".delete-bar");
let deleteStatus = document.querySelector(".delete-status > span");
let editBubble = document.querySelector(".edit-bubble");
let editBar = document.querySelector(".edit-bar");
let editStatus = document.querySelector(".edit-status > span");

let ticketTypeSpan = document.querySelector(".ticket-type > span");
let ticketPrioritySpan = document.querySelector(".ticket-priority > span");

// Ticket specific references;
let ticketTypeSelect = document.querySelector(".ticket-type > select");
let ticketPrioritySelect = document.querySelector(".ticket-priority > select");
let createTicketBtn = document.querySelector(".create-ticket-btn");
let ticketName = document.querySelector(".modal > .ticket-name > input");

// This variable is defined to stop editing and deleting while searching;
let isSearching = false;

// Creating the Local Storage in the browser;
if (localStorage.getItem("tasks") == null) {
    localStorage.setItem("tasks", JSON.stringify([]));
}



function loadTickets() {
    let taskArr = JSON.parse(localStorage.getItem("tasks"));
    for (let i = 0; i < taskArr.length; ++i) {
        let ticId = taskArr[i].id;
        let ticN = taskArr[i].ticketName;
        let ticT = taskArr[i].ticketType;
        let ticP = taskArr[i].ticketPriority;
        console.log(ticId, ticN, ticT, ticP);
        let div = document.createElement("div");
        div.classList.add("ticket");


        let className = "";

        if (ticP == "High Priority") {
            className = "red-color-btn";
        }
        else if (ticP == "Medium Priority") {
            className = "orange-color-btn";
        }
        else if (ticP == "Moderate Priority") {
            className = "green-color-btn";
        }
        else {
            className = "black-color-btn";
        }


        div.innerHTML = `<span class="ticket-header ${className}"></span>
                        Ticket ID : <span class="ticket-id">@${ticId}</span>
                        Ticket Name : <p class="ticket-name">${ticN}</p>
                        Ticket Type : <p class="ticket-type">${ticT}</p>
                        Ticket Priority : <p class="ticket-priority">${ticP}</p>`;
        grid.append(div);
    }
    getTicketList();
}



// Ticket loader function call;
loadTickets();




/*-------------------------These are required functions------------------------------ */

// Function to generate random unique id;
function generateUniqueId() {
    let chars = "ab12STUV34cdefghABCmnopqrxyz05ijkl6789DEFGHIJKLMNOPQRWstuvwXYZ";
    let unqId = "";
    for (let i = 0; i < 6; ++i) {
        unqId += chars.charAt((Math.floor(Math.random() * 10)) % chars.length);
    }
    return unqId;
}

// Function to get ticket list;
function getTicketList() {
    ticketToChange = document.querySelectorAll(".grid > div");
    // console.log(ticketToChange);
}


function getTicketTypeIcon() {
    if (ticketTypeSelect.value == "Bug Fix") {
        ticketTypeSpan.firstChild.removeAttribute("class");
        ticketTypeSpan.firstChild.classList.add("fa-solid");
        ticketTypeSpan.firstChild.classList.add("fa-bug");
        ticketTypeSpan.firstChild.style.color = "rgb(249, 18, 18)";
    }
    else if (ticketTypeSelect.value == "Feature Implement") {
        ticketTypeSpan.firstChild.removeAttribute("class");
        ticketTypeSpan.firstChild.classList.add("fa-solid");
        ticketTypeSpan.firstChild.classList.add("fa-lightbulb");
        ticketTypeSpan.firstChild.style.color = "rgb(45, 164, 224)";
    }
    else if (ticketTypeSelect.value == "Issue Fix") {
        ticketTypeSpan.firstChild.removeAttribute("class");
        ticketTypeSpan.firstChild.classList.add("fa-regular");
        ticketTypeSpan.firstChild.classList.add("fa-circle-xmark");
        ticketTypeSpan.firstChild.style.color = "rgb(214, 139, 0)";
    }
    else if (ticketTypeSelect.value == "New Project Development") {
        ticketTypeSpan.firstChild.removeAttribute("class");
        ticketTypeSpan.firstChild.classList.add("fa-solid");
        ticketTypeSpan.firstChild.classList.add("fa-folder-plus");
        ticketTypeSpan.firstChild.style.color = "rgb(0, 124, 29)";
    }
    else {
        ticketTypeSpan.firstChild.removeAttribute("class");
    }
}


function getTicketPriorityColor() {
    if (ticketPrioritySelect.value == "High Priority") {
        ticketPrioritySpan.style.backgroundColor = "rgb(249, 18, 18)";
    }
    else if (ticketPrioritySelect.value == "Medium Priority") {
        ticketPrioritySpan.style.backgroundColor = "rgb(238, 133, 13)";
    }
    else if (ticketPrioritySelect.value == "Moderate Priority") {
        ticketPrioritySpan.style.backgroundColor = "rgb(9, 195, 90)";
    }
    else if (ticketPrioritySelect.value == "Low Priority") {
        ticketPrioritySpan.style.backgroundColor = "rgb(0, 0, 0)";
    }
    else {
        ticketPrioritySpan.style.backgroundColor = "rgb(219, 219, 219)";
    }
}


function createTheTicket() {

    let valueInTicketName = ticketName.value.trim();

    if (valueInTicketName == "") {
        alert("Ticket Name is not given!!");
        return;
    }
    else if (ticketTypeSelect.value == "--Set Type--") {
        alert("Ticket Type is not Selected!!");
        return;
    }
    else if (ticketPrioritySelect.value == "--Set Priority--") {
        alert("Ticket Priority is not Selected!!");
        return;
    }

    else {
        let className = "";
        let div = document.createElement("div");
        div.classList.add("ticket");

        if (ticketPrioritySelect.value == "High Priority") {
            className = "red-color-btn";
        }
        else if (ticketPrioritySelect.value == "Medium Priority") {
            className = "orange-color-btn";
        }
        else if (ticketPrioritySelect.value == "Moderate Priority") {
            className = "green-color-btn";
        }
        else {
            className = "black-color-btn";
        }
        let uId = generateUniqueId();
        div.innerHTML = `<span class="ticket-header ${className}"></span>
                        Ticket ID : <span class="ticket-id">@${uId}</span>
                        Ticket Name : <p class="ticket-name">${valueInTicketName}</p>
                        Ticket Type : <p class="ticket-type">${ticketTypeSelect.value}</p>
                        Ticket Priority : <p class="ticket-priority">${ticketPrioritySelect.value}</p>`;
        // console.log(div);
        grid.append(div);

        // saving the data into the Local Storage;
        let dataObject = {
            id: uId,
            ticketName: valueInTicketName,
            ticketType: ticketTypeSelect.value,
            ticketPriority: ticketPrioritySelect.value
        };

        let tasksBox = JSON.parse(localStorage.getItem("tasks")); // pulling out the data which was previosly stored in the local storage;
        tasksBox.push(dataObject);                                // appending the new data into the array;
        localStorage.setItem("tasks", JSON.stringify(tasksBox));  // converting the array back to the string and pushing it into the local storage;   

        ticketName.value = "";
        ticketTypeSelect.value = "--Set Type--";
        ticketPrioritySelect.value = "--Set Priority--";
        ticketTypeSpan.firstChild.removeAttribute("class");
        ticketPrioritySpan.style.backgroundColor = "rgb(219, 219, 219)";
        createTicket.style.height = "0%";
        getTicketList()
    }
}


function deleteTheTicket() {
    if (deleteState == false) {
        if (isSearching == false) {
            deleteState = true;
            deleteBubble.style.right = "9%";
            deleteBar.style.backgroundColor = "rgb(9, 195, 90)";
            deleteStatus.style.color = "rgb(9, 195, 90)";
            deleteStatus.innerText = "ON";
            alert("You are enabling Delete Mode - Double click on any ticket to delete it.");

            getTicketList();
            for (let i = 0; i < ticketToChange.length; ++i) {
                ticketToChange[i].addEventListener("dblclick", (e) => {
                    if (deleteState == true) {
                        e.currentTarget.remove();
                        let taskArr = JSON.parse(localStorage.getItem("tasks"));
                        let newTaskArr = [];
                        for (let j = 0; j < taskArr.length; ++j) {
                            if (ticketToChange[i].querySelector(".ticket-id").innerText.split("@")[1] != taskArr[j].id) {
                                newTaskArr.push(taskArr[j]);
                            }
                        }
                        localStorage.setItem("tasks", JSON.stringify(newTaskArr));
                    }
                });
            }
        }
        else {
            alert("Searching mode is ON! Cannot delete right now.");
        }
    }
    else {
        deleteState = false;
        deleteBubble.style.right = "12%";
        deleteBar.style.backgroundColor = "#aaa";
        deleteStatus.style.color = "rgb(249, 18, 18)";
        deleteStatus.innerText = "OFF";
    }
}

function editTheTicket() {
    let selectTicketTypeFlagAdded = true;
    let selectTicketPriorityFlagAdded = true;
    if (editState == false) {
        if (isSearching == false) {
            editState = true;
            editBubble.style.right = "35%";
            editBar.style.backgroundColor = "rgb(9, 195, 90)";
            editStatus.style.color = "rgb(9, 195, 90)";
            editStatus.innerText = "ON";
            alert("You are enabling Edit Mode");
            let button = document.createElement("button");
            button.innerText = "Save the Edits";
            button.classList.add("save-the-edits");
            grid.append(button);

            let ticName = document.querySelectorAll(".ticket>.ticket-name");
            let ticType = document.querySelectorAll(".ticket>.ticket-type");
            let ticPriority = document.querySelectorAll(".ticket>.ticket-priority");
            for (let i = 0; i < ticketToChange.length; ++i) {

                ticName[i].setAttribute("contenteditable", true);

                ticType[i].addEventListener("click", (eTypeTag) => {
                    if (selectTicketTypeFlagAdded == true && editState == true) {
                        let selectT = document.createElement("select");
                        if (document.querySelector(".edit-select-menu") != null) {
                            let removeThis = document.querySelector(".edit-select-menu");
                            console.log(removeThis);
                            removeThis.remove();
                        }
                        selectT.classList.add("edit-select-menu");
                        selectT.innerHTML = `<option selected>Select Type</option>
                                    <option>Bug Fix</option>
                                    <option>Feature Implement</option>
                                    <option>Issue Fix</option>
                                    <option>New Project Development</option>`;
                        grid.append(selectT);

                        selectT.addEventListener("change", (eTypeSelectTag) => {
                            eTypeTag.target.innerText = eTypeSelectTag.currentTarget.value;
                            eTypeSelectTag.currentTarget.remove();
                        });
                    }
                });

                ticPriority[i].addEventListener("click", (ePriorityTag) => {
                    if (selectTicketPriorityFlagAdded == true && editState == true) {
                        let selectP = document.createElement("select");
                        if (document.querySelector(".edit-select-menu") != null) {
                            let removeThis = document.querySelector(".edit-select-menu");
                            console.log(removeThis);
                            removeThis.remove();
                        }
                        selectP.classList.add("edit-select-menu");
                        selectP.innerHTML = `<option selected>Select Priority</option>
                                    <option>High Priority</option>
                                    <option>Medium Priority</option>
                                    <option>Moderate Priority</option>
                                    <option>Low Priority</option>`;
                        grid.append(selectP);

                        selectP.addEventListener("change", (ePrioritySelectTag) => {
                            ePriorityTag.target.innerText = ePrioritySelectTag.currentTarget.value;
                            let ticketColorHeader = document.querySelectorAll(".ticket>.ticket-header");
                            if (ePrioritySelectTag.currentTarget.value == "High Priority") {
                                ticketColorHeader[i].style.backgroundColor = "rgb(249, 18, 18)";
                            }
                            else if (ePrioritySelectTag.currentTarget.value == "Medium Priority") {
                                ticketColorHeader[i].style.backgroundColor = "rgb(238, 133, 13)";
                            }
                            else if (ePrioritySelectTag.currentTarget.value == "Moderate Priority") {
                                ticketColorHeader[i].style.backgroundColor = "rgb(9, 195, 90)";
                            }
                            else {
                                ticketColorHeader[i].style.backgroundColor = "rgb(0, 0, 0)";
                            }
                            ePrioritySelectTag.currentTarget.remove();
                        });
                    }
                });

            }

            button.addEventListener("click", () => {
                let tasksBox = JSON.parse(localStorage.getItem("tasks"));
                console.log(tasksBox);
                for (let i = 0; i < tasksBox.length; ++i) {
                    tasksBox[i].ticketName = ticName[i].innerText;
                    tasksBox[i].ticketType = ticType[i].innerText;
                    tasksBox[i].ticketPriority = ticPriority[i].innerText;
                }

                for (let i = 0; i < ticName.length; ++i) {
                    ticName[i].removeAttribute("contenteditable");
                }

                let selectList = document.querySelectorAll(".edit-select-menu");
                for (let i = 0; i < selectList.length; ++i) {
                    selectList[i].remove();
                }
                document.querySelector(".save-the-edits").remove();
                localStorage.setItem("tasks", JSON.stringify(tasksBox));
                editState = false;
                editBubble.style.right = "38%";
                editBar.style.backgroundColor = "#aaa";
                editStatus.style.color = "rgb(249, 18, 18)";
                editStatus.innerText = "OFF";
            });
        }
        else {
            alert("Searching Mode is ON! Cannot Edit.");
        }
    }
    else {
        editState = false;
        editBubble.style.right = "38%";
        editBar.style.backgroundColor = "#aaa";
        editStatus.style.color = "rgb(249, 18, 18)";
        editStatus.innerText = "OFF";
        let ticName = document.querySelectorAll(".ticket>.ticket-name");
        for (let i = 0; i < ticName.length; ++i) {
            ticName[i].removeAttribute("contenteditable");
        }
        document.querySelector(".save-the-edits").remove();
    }
}



/*-------------------------These are required functions------------------------------ */


// To appear create ticket modal on the screen;
addTicket.addEventListener("click", () => {
    createTicket.style.height = "91%";
    if (deleteState == true) {
        deleteState = false;
        deleteBubble.style.right = "12%";
        deleteBar.style.backgroundColor = "#aaa";
        deleteStatus.style.color = "rgb(249, 18, 18)";
        deleteStatus.innerText = "OFF";
    }
    if (editState == true) {
        editState = false;
        editBubble.style.right = "38%";
        editBar.style.backgroundColor = "#aaa";
        editStatus.style.color = "rgb(249, 18, 18)";
        editStatus.innerText = "OFF";
    }
});



// To close the create ticket modal from the screen;
cancelTicket.addEventListener("click", () => {
    createTicket.style.height = "0%";
});







// To change the icons according to the ticket type selection;
ticketTypeSelect.addEventListener("change", getTicketTypeIcon);


// To change the span color according to the ticket priority;
ticketPrioritySelect.addEventListener("change", getTicketPriorityColor);


// To create the ticket after clicking on create ticket button;
createTicketBtn.addEventListener("click", createTheTicket);



// To delete the ticket;
deleteBubble.addEventListener("click", deleteTheTicket);

// To edit the ticket;

editBubble.addEventListener("click", editTheTicket);






// To change the background colors of the grid according to the click;
let colors = {
    red: "rgb(249, 18, 18)",
    orange: "rgb(238, 133, 13)",
    green: "rgb(9, 195, 90)",
    black: "rgb(0, 0, 0)"
};
for (let i = 0; i < allFilters.length; ++i) {
    allFilters[i].addEventListener("click", (e) => {
        isSearching = true;
        // let color = e.currentTarget.classList[0].split("-")[0];
        // grid.style.backgroundColor = colors[color];
        // console.log(allFilters[i].innerText);
        let taskArr = JSON.parse(localStorage.getItem("tasks"));
        for (let j = 0; j < ticketToChange.length; ++j) {
            if (allFilters[i].innerText == "Show All") {
                ticketToChange[j].style.display = "block";
                isSearching = false;
            }
            else if (ticketToChange[j].querySelector(".ticket-priority").innerText != allFilters[i].innerText) {
                ticketToChange[j].style.display = "none";
            }
            else {
                ticketToChange[j].style.display = "block";
            }
        }
    });
}