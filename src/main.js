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
const heldKeys=[]
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
    listItems= listItems.sort((a,b)=>{
        // parseInt(b.getElementsByClassName('todoPriority')[0].innerText)-parseInt(a.getElementsByClassName('todoPriority')[0].innerText))
        let aVal= parseInt(a.getElementsByClassName('todoPriority')[0].innerText);
        let bVal= parseInt(b.getElementsByClassName('todoPriority')[0].innerText);
        return bVal-aVal;
    })
    list.innerHTML= '';
    listItems.forEach((x)=>list.appendChild(x));
}
let keyUp=(e)=>{
    debugger
    let lifted= e.which;
    if(heldKeys.includes(lifted)) heldKeys.splice(heldKeys.indexOf(lifted),1);//remove lifted key from heldKeys
    if(heldKeys.includes(17)){//if ctrl is held
        switch (e.which){
            case 49:
                prioritySelector.value=1;
                break;
            case 50:
                prioritySelector.value=2;
                break;
            case 51:
                prioritySelector.value=3;
                break;
            case 52:
                prioritySelector.value=4;
                break;
            case 53:
                prioritySelector.value=5;
                break;
            default:
                break;
        }           
    }
}

let keyDown =(e)=>{
    const down=e.which;
    if(heldKeys.includes(down))return;
    heldKeys.push(down)
}


addButton.addEventListener('click',addItem);
sortButton.addEventListener('click',sortList);
document.addEventListener('keyup',keyUp)
document.addEventListener('keydown',keyDown)