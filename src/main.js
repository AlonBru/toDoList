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
const pinButton= document.getElementById('priorityPin')
//useful resources
let priority_pinned = false;
const time= new Date();
const year= time.getFullYear();
const month= (time.getMonth()<9)? '0'+(time.getMonth()+1):time.getMonth()+1;
const day= time.getDate();
let listItems= [];
const priorityColours= {
    0:'white',
    1:'#009933',
    2:'#CCAF46',
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
    }else if (prioritySelector.value==='0'){
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
    todoPriority.style.border= (prioritySelector.value==='5')? '2px as white':'1px solid black'
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
    
    if(!priority_pinned){
        prioritySelector.value=0;
        prioritySelector.style.background=priorityColours[prioritySelector.value];
    }input.value=null;
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
const keyUp=(e)=>{
    e.preventDefault();
    let lifted= e.which;
    if(heldKeys.includes(lifted)) heldKeys.splice(heldKeys.indexOf(lifted),1);//remove lifted key from heldKeys
    if(heldKeys.includes(16)){//if shift is held
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

const keyDown =(e)=>{
    const down=e.which;
    if (e.which===13) addButton.click();
    if(heldKeys.includes(down))return;
    heldKeys.push(down)
}
const inputShortCuts=(e)=>{
    
    input.addEventListener('keyup',keyUp);
    input.addEventListener('keydown',keyDown); 
}
const removeInputShortCuts=(e)=>{
    debugger
    input.removeEventListener('keyup',keyUp);
    input.removeEventListener('keydown',keyDown);
    }
const pinPriority=()=>{
       if(priority_pinned===false){
        pinButton.style.background='crimson';
        pinButton.style.borderStyle='inset';
        // pinButton.style.boxShadow= '-5px -5px inset rgba(100,100,100,.6)';
        pinButton.style.color= 'white'
        priority_pinned = true;
    }else{
        pinButton.style.background='whitesmoke';
        pinButton.style.borderStyle='outset';
        // pinButton.style.boxShadow= '';
        pinButton.style.color= 'maroon';
        priority_pinned = false;
    }
}

addButton.addEventListener('click',addItem);
sortButton.addEventListener('click',sortList);
pinButton.addEventListener('click',pinPriority)
input.addEventListener('focus',inputShortCuts);
input.addEventListener('focusout',removeInputShortCuts);
prioritySelector.onchange=()=>{
    prioritySelector.style.background=priorityColours[prioritySelector.value];
    prioritySelector.style.color= (prioritySelector.value===null)?'white':'black';
}