// elements
const list= document.getElementById('view');
const control = document.getElementById('control');
const input = document.getElementById('textInput');
const prioritySelector =document.getElementById('prioritySelector');
const addButton =document.getElementById('addButton');
const counter= document.getElementById('counter')
const errorLabel= document.getElementById('errorLabel')
const sortButton= document.getElementById('sortButton')
const item= document.getElementsByClassName('todoContainer')
//useful resources
const time= new Date();
const year= time.getFullYear();
const month= (time.getMonth()<9)? '0'+(time.getMonth()+1):time.getMonth()+1;
const day= time.getDate();
let listItems= [];
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
const checkField=()=>{
    errorLabel.hidden=true;
    if (input.value===''){
        errorLabel.toggleAttribute('hidden');
        errorLabel.innerText= 'Can\'t create empty task';
        return true;
    }else if (prioritySelector.value===''){
        errorLabel.toggleAttribute('hidden');
        errorLabel.innerText= 'Task Priority must be set';
        return true;
    }else {return false;}
}

const addItem=()=>{
    if (checkField()) return;
    
    //container
    const item= create('div');
    list.appendChild(item)
    item.className='todoContainer';
    const done =create('button');
    //priority
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
    listItems.push(item);
    counter.innerText= listItems.length
    //reset input fields
    prioritySelector.value=''
    input.value=null;
    input.focus();
    // sortList();
}
const sortList=()=>{
    debugger
    listItems= listItems.sort((a,b)=>parseInt(b.getElementsByClassName('todoPriority')[0].innerText)-parseInt(a.getElementsByClassName('todoPriority')[0].innerText))
    list.innerHTML= '';
    listItems.forEach((x)=>list.appendChild(x));
}




addButton.addEventListener('click',addItem);
sortButton.addEventListener('click',sortList);