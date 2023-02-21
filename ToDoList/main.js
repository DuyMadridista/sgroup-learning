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
                date: date
            }
            CreateData(data, function () {
                getData();
            });
        
        }
        else{ alert("Please fill in all the fields")}
    }
}
//edit data
function HandleEditData(id) { 
    let dataEdit = document.querySelector('.data-item-' + id)
    let category = dataEdit.querySelector('.Kind-Title"]');
    let title = dataEdit.querySelector('.Main-Title"]');
    let description = dataEdit.querySelector('.description');
    document.querySelector('input[name="titleEdit"]').value = title.innerText;
    document.querySelector('input[name="categoryEdit"]').value = category.innerText;
    document.querySelector('textarea[name="descriptionEdit"]').value = description.innerText;
    document.querySelector('input[value="Todo"]') = true;
    let getAddEditBtn = document.getElementById("AddEditBtn");
    getAddEditBtn.onclick = function () {
        let title = document.querySelector('input[name="title"]').value;
        let category = document.querySelector('input[name="category"]').value;
        let description = document.querySelector('textarea[name="description"]').value;
        let radio = document.querySelector('input[name="status"]:checked').value;
        let data = {
            title: title,
            category: category,
            description: description,
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

function renderData(data) {
    var htmls = data.map(function (data) {
        return `
        <div class="formContainer data-item-${data.id}">
                            <div class="FormTitle">
                                <div class="Title-Content">
                                    <div class="Kind-Title">${data.category}</div>
                                    <div class="Main-Title">${data.title}</div>
                                </div>
                                <div class="Title-Btn">
                                    <button onclick="displayEdit()" class="editBtn">
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
    document.querySelector(".TodoList").innerHTML = htmls.join("");
}

let getEditBtn = document.querySelectorAll(".editBtn");
for (let i = 0; i < getEditBtn.length; i++) {
    getEditBtn[i].addEventListener("click", function () {
        displayEditForm.style.display = "block";
    });
}
function displayEdit() {
    displayEditForm.style.display = "block";
}