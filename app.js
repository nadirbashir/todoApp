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
  
    if(taskInput.value !== "" && taskDate.value !== ""){
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
        var list = listGroup.createNode("li");
        list.setAttribute("class","list-group-item");
        list.createTextNode(todos+" "+expDate);
        
    })
}
getTask();