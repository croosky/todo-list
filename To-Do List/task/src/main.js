function addtoStorage(){
    let act_tasks = document.getElementById("task-list-actual").innerHTML;
    localStorage.setItem("act-tasks", JSON.stringify(act_tasks));
    let overdue_tasks = document.getElementById("task-list-overdue").innerHTML;
    localStorage.setItem("overdue-tasks", JSON.stringify(overdue_tasks));
}
function getfromStorage(){
    document.getElementById("task-list-actual").innerHTML = JSON.parse(localStorage.getItem("act-tasks")) || [];
    document.getElementById("task-list-overdue").innerHTML = JSON.parse(localStorage.getItem("overdue-tasks")) || [];
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
                elem.closest("li").children[2].style.textDecoration = "line-through";
                document.getElementById("task-list-overdue").append(elem.closest("li"));
            }
            else{
                elem.closest("li").children[2].style.textDecoration = "none";
                document.getElementById("task-list-actual").prepend(elem.closest("li"));
            }
            addtoStorage();
        });
    });
}
function addTask(){
    let input_task = document.getElementById("input-task");
    if (input_task.value) {
        let ul = document.getElementById("task-list-actual");
        let li = document.createElement("li");
        li.setAttribute("class", "list-item");
        let editbtn = document.createElement("button");
        editbtn.setAttribute("class", "editbtn btn");
        editbtn.textContent = "Ok";
        editbtn.style.visibility="hidden";
        let input = document.createElement("input");
        input.setAttribute("type", "checkbox");
        input.setAttribute("class", "checkbox");
        let span = document.createElement("span");
        span.setAttribute("class", "task");
        span.setAttribute("contentEditable", "true");
        span.textContent = input_task.value;
        let delbtn = document.createElement("button");
        delbtn.setAttribute("class", "delete-btn btn");
        delbtn.textContent = "X";
        li.append(editbtn);
        li.append(input);
        li.append(span);
        li.append(delbtn);
        ul.append(li);
        input_task.value = "";
        remove_li();
        crossout();
        editTask();
        addtoStorage();
    }
}
function changeTheme(){
    document.getElementById("light-color").addEventListener("click", function(){
        document.documentElement.className="light-theme";
    });
    document.getElementById("dark-color").addEventListener("click", function(){
        document.documentElement.className="dark-theme";
    });
    document.getElementById("warm-color").addEventListener("click", function(){
        document.documentElement.className="warm-theme";
    });
    document.getElementById("cold-color").addEventListener("click", function(){
        document.documentElement.className="cold-theme";
    });
}
function editTask(){
    document.querySelectorAll(".task").forEach(function (elem){
        elem.addEventListener("click", function (){
            console.log("something");
            elem.closest("li").children[0].style.visibility="visible";
            elem.closest("li").children[0].addEventListener("click", function(){
                elem.closest("li").children[0].style.visibility="hidden";
                addtoStorage();
            });
        });
        });
}
getfromStorage();
document.getElementById("add-task-button").addEventListener("click", addTask);
document.getElementById("input-task").addEventListener("keyup", function(event){
    if (event.code == "Enter"){
        addTask();
    }
});
remove_li();
crossout();
editTask();
changeTheme();

