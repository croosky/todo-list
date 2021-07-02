function addtoStorage(){
    let tasks = document.getElementById("task-list").innerHTML;
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function getfromStorage(){
    let tests = JSON.parse(localStorage.getItem("tasks")) || [];
    document.getElementById("task-list").innerHTML = JSON.parse(localStorage.getItem("tasks")) || [];
}

function remove_li() {
    document.querySelectorAll(".delete-btn").forEach(function(elem) {
        elem.addEventListener("click", function() {
            elem.closest("li").remove();
            addtoStorage();
        });
    });
}

function crossout() {
    document.querySelectorAll(".checkbox").forEach(function (elem){
        elem.addEventListener("change", function (){
            if (elem.checked){
                elem.closest("li").children[1].style.textDecoration = "line-through";
            }
            else{
                elem.closest("li").children[1].style.textDecoration = "none";
            }
            addtoStorage();
        });
    });
}
getfromStorage();
let add_btn = document.getElementById("add-task-button");
add_btn.addEventListener("click", function(){ //Adding new task by clicking the AddTask button
    let input_task = document.getElementById("input-task");
    if (input_task.value) {
        let ul = document.getElementById("task-list");
        let li = document.createElement("li");
        li.setAttribute("class", "list-item");
        let input = document.createElement("input");
        input.setAttribute("type", "checkbox");
        input.setAttribute("class", "checkbox");
        let span = document.createElement("span");
        span.setAttribute("class", "task");
        span.textContent = input_task.value;
        let delbtn = document.createElement("button");
        delbtn.setAttribute("class", "delete-btn btn");
        delbtn.textContent = "X";
        li.append(input);
        li.append(span);
        li.append(delbtn);
        ul.append(li);
        input_task.value = "";
        remove_li();
        crossout();
        addtoStorage();
    }
});
remove_li();
crossout();

