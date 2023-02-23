let displayAddingForm = document.getElementById("adding-form");
let displayEditForm = document.getElementById("editing-form");
let getAddBtn = document.getElementById("add-btn");
let getCloseAddBtn = document.getElementById("close-Btn");
let getCloseEditBtn=document.getElementById("close-edit-Btn");
getAddBtn.addEventListener("click", function () {
    displayAddingForm.style.display = "block";
});
getCloseAddBtn.addEventListener("click", function () {
    displayAddingForm.style.display = "none";
});
getCloseEditBtn.addEventListener("click", function () {
    displayEditForm.style.display = "none";
});



var dataApi="http://localhost:3000/data"
function start() {
    getData();
    handleCreateForm();

}
start();
//create data
function getData() {
    fetch(dataApi)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            renderData(data);
        });
}

function CreateData(data,callback) {
    fetch(dataApi, {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)})
    .then(function (response) {
        return response.json();
    })
    .then(callback)
}

function handleCreateForm() {
    let submitBtn = document.querySelector('input[name="submit"]');
    submitBtn.onclick = function (e) {
        e.preventDefault();
        let title = document.querySelector('input[name="title"]').value;
        let category = document.querySelector('input[name="category"]').value;
        let description = document.querySelector('textarea[name="description"]').value;
        let date = document.querySelector('input[name="date"]').value;
        
        if (title != "" & category != "" & description != "" & date != "") {
            let data = {
                title: title,
                category: category,
                description: description,
                date: date,
                status: "Todo"
            }
            CreateData(data, function () {
                getData();
            });
        
        }
        else{ alert("Please fill in all the fields")}
    }
}
function getCheckBoxData() {
    let checkbox = document.querySelectorAll('input[name="status"]');
    for (let i = 0; i < checkbox.length; i++) {
        if (checkbox[i].checked == true) {
            return checkbox[i].value;
        }
    }
}

//edit data
function HandleEditData(id) { 
    let dataEdit = document.querySelector('.data-item-' + id)
    let category = dataEdit.querySelector('.Kind-Title');
    let title = dataEdit.querySelector('.Main-Title');
    let description = dataEdit.querySelector('.description');
    let date = dataEdit.querySelector('.deadline-date');
    document.querySelector('input[name="titleEdit"]').value = title.innerText;
    document.querySelector('input[name="categoryEdit"]').value = category.innerText;
    document.querySelector('textarea[name="descriptionEdit"]').value = description.innerText;
    getCheckBoxData();
    if (getCheckBoxData() == "Todo") {
        document.querySelector('input[name="status"]').checked = True
    }
    else if (getCheckBoxData() == "Doing") { document.getElementsByTagName('input[name="status"]')[1].checked = True }
    else if(getCheckBoxData() == "Doing"){ document.getElementsByTagName('input[name="status"]')[2].checked = True }
    let getAddEditBtn = document.getElementById("AddEditBtn");
    getAddEditBtn.onclick = function () {
        let title = document.querySelector('input[name="titleEdit"]').value;
        let category = document.querySelector('input[name="categoryEdit"]').value;
        let description = document.querySelector('textarea[name="descriptionEdit"]').value;
        let dateEdited = date;
        let radio = getCheckBoxData();
        let data = {
            title: title,
            category: category,
            description: description,
            date: dateEdited.innerText,
            status: radio
        }
        EditData(data,id); 
        
        
    }
    
}
function  EditData(data,id) {
    fetch(dataApi + '/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(function (response) {
            return response.json();
        })
        .then(function () {
            getData();
        })
    
}
//delete data
function HandleDeleteData (id) {
    fetch(dataApi + '/'+id, {
        method: 'DELETE',
        headers: {
            'Content-Type':'application/json'
        },
        })
    .then(function (response) {
        return response.json();
    })
        .then(function () {
            var dataDelete = document.querySelector('.data-item-' + id)
            dataDelete.remove();
    })
    
}
var countTodoData=0, countDoingData=0, countDoneData=0;
function renderData(data) {
    let todoList = [];
    let doingList = [];
    let doneList = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].status == "Todo") { 
            todoList.push(data[i]);
            countTodoData++;
        }
        else if (data[i].status == "Doing") {
            doingList.push(data[i]);
            countDoingData++;}
        else if (data[i].status == "Done") {
            doneList.push(data[i]);
            countDoneData++;
        }
    }
    var todo =todoList.map(function (data) {
        return `
        <div class="formContainer data-item-${data.id}">
                            <div class="FormTitle">
                                <div class="Title-Content">
                                    <div class="Kind-Title">${data.category}</div>
                                    <div class="Main-Title">${data.title}</div>
                                </div>
                                <div class="Title-Btn">
                                    <button onclick="displayEdit(HandleEditData(${data.id}))" class="editBtn">
                                        <i class="fa-sharp fa-regular fa-edit "></i>
                                    </button>
                                    <button  onclick="HandleDeleteData(${data.id})" class="deleteBtn">
                                        <i class="fa-solid fa-trash "></i>
                                    </button>
                                </div>
                            </div>
                            <div class="form-details">
                                <p class="description" >${data.description}</p>
                                <div class="deadline">
                                    <i class="fa-sharp fa-regular fa-clock"></i>
                                    <div class="deadline-date">${data.date}</div>
                                </div>
                            </div>
                        </div>
        `;
    });
    var Doing =doingList.map(function (data) {
        return `
        <div class="formContainer data-item-${data.id}">
                            <div class="FormTitle">
                                <div class="Title-Content">
                                    <div class="Kind-Title">${data.category}</div>
                                    <div class="Main-Title">${data.title}</div>
                                </div>
                                <div class="Title-Btn">
                                    <button onclick="displayEdit(HandleEditData(${data.id}))" class="editBtn">
                                        <i class="fa-sharp fa-regular fa-edit "></i>
                                    </button>
                                    <button  onclick="HandleDeleteData(${data.id})" class="deleteBtn">
                                        <i class="fa-solid fa-trash "></i>
                                    </button>
                                </div>
                            </div>
                            <div class="form-details">
                                <p class="description" >${data.description}</p>
                                <div class="deadline">
                                    <i class="fa-sharp fa-regular fa-clock"></i>
                                    <div class="deadline-date">${data.date}</div>
                                </div>
                            </div>
                        </div>
        `;
    });
    var Done =doneList.map(function (data) {
        return `
        <div class="formContainer data-item-${data.id}">
                            <div class="FormTitle">
                                <div class="Title-Content">
                                    <div class="Kind-Title">${data.category}</div>
                                    <div class="Main-Title">${data.title}</div>
                                </div>
                                <div class="Title-Btn">
                                    <button onclick="displayEdit(HandleEditData(${data.id}))" class="editBtn">
                                        <i class="fa-sharp fa-regular fa-edit "></i>
                                    </button>
                                    <button  onclick="HandleDeleteData(${data.id})" class="deleteBtn">
                                        <i class="fa-solid fa-trash "></i>
                                    </button>
                                </div>
                            </div>
                            <div class="form-details">
                                <p class="description" >${data.description}</p>
                                <div class="deadline">
                                    <i class="fa-sharp fa-regular fa-clock"></i>
                                    <div class="deadline-date">${data.date}</div>
                                </div>
                            </div>
                        </div>
        `;
    });

            document.querySelector(".TodoList").innerHTML = todo.join("");
            document.querySelector(".countTodo").innerHTML = countTodoData;

            document.querySelector(".DoingList").innerHTML = Doing.join("");
            document.querySelector(".countDoing").innerHTML = countDoingData;
        

            document.querySelector(".DoneList").innerHTML = Done.join("");
            document.querySelector(".countDone").innerHTML = countDoneData;

}

let getEditBtn = document.querySelectorAll(".editBtn");
for (let i = 0; i < getEditBtn.length; i++) {
    getEditBtn[i].addEventListener("click", function () {
        displayEditForm.style.display = "block";
    });
}
function displayEdit(callback) {
    displayEditForm.style.display = "block";
    callback;
}
