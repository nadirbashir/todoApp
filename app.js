var taskInput = document.getElementById("taskInput"); 
var taskDate = document.getElementById("taskDate");
var listGroup = document.getElementById("listGroup");
// var addTask = document.getElementById("addTask");
var database = firebase.database();

function Task(name, date,key){
    this.name = name;   
    this.date = date;
    this.key = key;
};


Task.prototype.addTask = function (){
    
};

function addTask(){
  
    if(taskInput.value && taskDate.value){
        var key = database.ref('/task').push().key;
        var newTask = new Task(taskInput.value, taskDate.value, key);
        database.ref('/task/'+key).set(newTask);
        taskInput.value = "";
        taskDate.value = "";
    }
}

function getTask(){
    database.ref("/task").on('child_added',function(data){
        var todos = data.val().name;
        var expDate = data.val().date;
        var key = data.val().key;
        var list = document.createElement("li");
        var para = document.createElement("div");
        var date = document.createElement("div");
        var btnGroup = document.createElement("div");
        var editBtn = document.createElement("button");
        var delBtn = document.createElement("button");
        editBtn.setAttribute("class","btn btn-light");
        editBtn.setAttribute("id","editBtn");
        
        delBtn.setAttribute("class","btn btn-danger");
        delBtn.setAttribute("id","delBtn");
        delBtn.setAttribute("onclick","deleteTodo(" + key + ")");

        date.setAttribute("class","todo-date");
        date.appendChild(document.createTextNode(expDate));
        
        para.setAttribute("class", "todo-para");
        para.appendChild(document.createTextNode(todos));
        
        list.setAttribute("class","list-group-item list");
        list.appendChild(para);
        list.appendChild(date);
        list.appendChild(btnGroup);
        editBtn.appendChild(document.createTextNode("Edit"));
        delBtn.appendChild(document.createTextNode("Delete"));
        btnGroup.appendChild(editBtn);
        btnGroup.appendChild(delBtn);
        listGroup.appendChild(list);
        
    })
}

function deleteTodo(key){
    // database.ref('/task/'+key).remove()
    console.log(key)
    // console.log(x.parentNode.parentNode.remove())
}

getTask();