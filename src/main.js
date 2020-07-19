// li template:
//<todoPriority><todoTest><todoCreatedAt>
const list= document.getElementById('view');
const control = document.getElementById('control');
const input = document.getElementById('inputText');
const prioritySelector =document.getElementById('prioritySelector');
const addButton =document.getElementById('addButton');

const create= (name)=>{
    return document.createElement(name);
}

const addItem=()=>{
    if (list.querySelector('#undoError')) list.removeChild(list.querySelector('#undoError'));
    //creating relevant elements
    const item= create('div');
    const todoPriority= create('div');
    const todoText= create('div');
    const todoTime= create('div');
    //setting classes
    item.className='todoContainer';
    todoText.className= 'todoText';
    todoPriority.className= 'todoPriority';
    todoTime.className= 'todoCreatedAt';
    //setting values
    todoPriority.innerText= prioritySelector.value
    todoText.innerText= input.value;
    todoTime.innerText= `Added at: Date}`
    //appending
    item.appendChild(todoPriority);
    item.appendChild(todoText);
    item.appendChild(todoTime);
    list.appendChild(item)
}

addButton.addEventListener('click',addItem)