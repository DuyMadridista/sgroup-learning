let displayAddingForm = document.getElementById("adding-form");
let getAddBtn = document.getElementById("add-btn");
let getCloseBtn = document.getElementById("close-Btn");
getAddBtn.addEventListener("click", function () {
    displayAddingForm.style.display = "block";
});
getCloseBtn.addEventListener("click", function () {
    displayAddingForm.style.display = "none";
});
