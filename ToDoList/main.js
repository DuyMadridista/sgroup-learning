let displayAddingForm = document.getElementById("adding-form");
let displayEditForm = document.getElementById("editing-form");
let getAddBtn = document.getElementById("add-btn");
let getCloseAddBtn = document.getElementById("close-Btn");
let getCloseEditBtn=document.getElementById("close-edit-Btn");
let getEditBtn = document.getElementsByClassName("editBtn");
getAddBtn.addEventListener("click", function () {
    displayAddingForm.style.display = "block";
});
getCloseAddBtn.addEventListener("click", function () {
    displayAddingForm.style.display = "none";
});
getCloseEditBtn.addEventListener("click", function () {
    displayEditForm.style.display = "none";
});
for (let i = 0; i < getEditBtn.length; i++) {
    getEditBtn[i].addEventListener("click", function () {
        displayEditForm.style.display = "block";
    });
}
