const upButton = document.querySelector("#getFileBtn");
const checkButton = document.querySelector("#check");
checkButton.addEventListener("click", () => {
    alert("ok");
});

upButton.addEventListener("click", () => {
    document.querySelector("#getFile").click();
});