// elements
const list= document.getElementById('view');
const control = document.getElementById('control');
const input = document.getElementById('textInput');
const prioritySelector =document.getElementById('prioritySelector');
const addButton =document.getElementById('addButton');
const counter= document.getElementById('counter')

//useful resources
const time= new Date();
const year= time.getFullYear();
const month= (time.getMonth()<9)? '0'+(time.getMonth()+1):time.getMonth()+1;
const day= time.getDate();
const todos= [];
const priorityColours= {
    1:'green',
    2:'yellow',
    3:'orange',
    4:'red',
    5:'maroon'
}
//functions

const create= (name)=>{
    return document.createElement(name);
}

const addItem=(e)=>{
    //container
    const item= create('div');
    list.appendChild(item)
    item.className='todoContainer';
    const done =create('button');
    //priority
    debugger
    const todoPriority= create('div');
    todoPriority.className= 'todoPriority';
    todoPriority.style.background=priorityColours[prioritySelector.value];
    todoPriority.style.border= (prioritySelector.value==='5')? '2px dotted white':'1px solid black'
    todoPriority.innerText= prioritySelector.value;
    item.appendChild(todoPriority);
    //text
    const todoText= create('div');
    todoText.className= 'todoText';
    todoText.innerText= input.value;
    item.appendChild(todoText);
    //time
    const todoTime= create('div');
    todoTime.className= 'todoCreatedAt';
    todoTime.innerText= `Added at: ${year}-${month}-${day}`
    item.appendChild(todoTime);
    //counter
    todos.push(item)
    counter.innerText= todos.length
    //reset input fields
    prioritySelector.value=''
    input.value=null;
    input.focus();
}

addButton.addEventListener('click',addItem)
