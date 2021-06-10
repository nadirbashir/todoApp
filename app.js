var taskInput = document.getElementById("taskInput"); 
var taskDate = document.getElementById("taskDate");
var listGroup = document.getElementById("listGroup");
// var addTask = document.getElementById("addTask");
var database = firebase.database();

function Task(name, date,id){
    this.name = name;   
    this.date = date;
    this.id = id;
};


Task.prototype.addTask = function (){
    
};

function addTask(){
  
    if(taskInput.value && taskDate.value){
        var id = database.ref('/task').push().key;
        var newTask = new Task(taskInput.value, taskDate.value, id);
        database.ref('/task/'+id).set(newTask);
        taskInput.value = "";
        taskDate.value = "";
    }
}

function getTask(){
    database.ref("/task").on('child_added',function(data){
        var todos = data.val().name;
        var expDate = data.val().date;
        var list = document.createElement("li");
        var para = document.createElement("div");
        var date = document.createElement("div");
        var btnGroup = document.createElement("div");
        var editBtn = document.createElement("button");
        var delBtn = document.createElement("button");
        editBtn.setAttribute("class","btn btn-light");
        editBtn.setAttribute("id",data.val().id);
        
        delBtn.setAttribute("class","btn btn-danger");
        delBtn.setAttribute("id",data.val().id);
        delBtn.setAttribute("onclick","deleteTodo(this)");

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

function deleteTodo(e){
    database.ref('/task').child(e.id).remove();
    // console.log(e.id)
    e.parentNode.parentNode.remove();
}
function editTodo(e){

}
getTask();
