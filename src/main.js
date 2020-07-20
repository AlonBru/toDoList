// elements
const control = document.getElementById('control');
const input = document.getElementById('textInput');
const prioritySelector =document.getElementById('prioritySelector');
const addButton =document.getElementById('addButton');
const counter= document.getElementById('counter')
const errorLabel= document.getElementById('errorLabel')
const doneCounter= document.getElementById('doneCounter')
const sortButton= document.getElementById('sortButton')
const items=()=>{
    const items= [];
    for(let x of document.getElementsByClassName('todoContainer')){
        let item =x;
        let pri = x.getElementsByClassName('todoPriority')[0].value;
        let text= x.getElementsByClassName('todoText')[0].innerText;
        let time= x.getElementsByClassName('todoCreatedAt')[0].value;
        let tick= x.getElementsByClassName('todoTick')[0].checked;
        items.push({item,pri,text,time,tick});
    }
    return items
} 
const sortSelect=document.getElementById('sortByButton')
const pinButton= document.getElementById('priorityPin')
const list= document.getElementById('view');

//useful resources
let priority_pinned = false;// pin button pressed
const time= new Date();
const year= time.getFullYear();
const month= (time.getMonth()<9)?
    '0'+(time.getMonth()+1):time.getMonth()+1;
const day= time.getDate();
let doneTasks=0
const priorityColours= {//colours of priorities
    0:'white',
    1:'#009933',
    2:'#DCbF16',
    3:'orangered',
    4:'crimson',
    5:'maroon'
}
const heldKeys=[]//keys held down- for keyboard shortcuts
//functions
const create= (name)=>{//creating new element
        return document.createElement(name);
}
const checkField=()=>{//checks if inputs are viable
    
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

const addItem=()=>{//for adding tasks
    if (checkField()) return;
    
    //container
    const item= create('div');
    list.appendChild(item)
    item.className='todoContainer';
    const done =create('button');
    //priority
    const todoPriority= create('div');
    todoPriority.className= 'todoPriority';
    todoPriority.value= prioritySelector.value
    todoPriority.style.background=priorityColours[prioritySelector.value];
    todoPriority.innerText= prioritySelector.value;
    item.appendChild(todoPriority);
    //text
    MakeText(input.value,item);
    //checkbox
    const todoTick= create('input');
    todoTick.type= 'checkbox';
    todoTick.className= 'todoTick';
    item.appendChild(todoTick);
    //time
    const todoTime= create('div');
    todoTime.className= 'todoCreatedAt';
    todoTime.value= new Date;
    todoTime.innerText= `Added at: ${year}-${month}-${day}`
    item.appendChild(todoTime);
    //counter
    counter.innerText= items().length
    //reset input fields
    
    if(!priority_pinned){
        prioritySelector.value=0;
        prioritySelector.style.background=priorityColours[prioritySelector.value];
    }input.value=null;
    input.focus();
    // sortList();
}
const MakeText=(input,parent)=>{
    const text= create('div');
    text.className= 'todoText';
    text.innerText= input;
    parent.appendChild(text);
}



const sortBy=()=>{//sorting
    sortList(sortByButton.value)
}
const sortList=(type)=>{
    let listItems;
    if(type==='pri'||type==='priR'){
        listItems= items().sort((a,b)=>{
            let aVal= parseInt(a.pri);
            let bVal= parseInt(b.pri);
            return bVal-aVal;
        })
    }
    if(type==='text'||type==='textR') {
        listItems= items().sort((a, b)=>{
            const aVal= a.text.toUpperCase();
            const bVal=  b.text.toUpperCase();
            let comparison = (aVal > bVal)?1:-1;
            return comparison;
        })
    }
    if(type==='time'||type==='timeR'){
        listItems= items().sort((a, b)=>{
            const aVal= a.time;
            const bVal=  b.time;
            let comparison = (aVal > bVal)?1:-1;
            return comparison;
        })
    }
    if (type.includes('R'))listItems.reverse()
    list.innerHTML= '';
    listItems.forEach((x)=>list.appendChild(x.item));
}
const keyUp=(e)=>{//for keyboard shortcuts
    e.preventDefault();
    let lifted= e.which;
    if(heldKeys.includes(lifted)) heldKeys.splice(heldKeys.indexOf(lifted),1);//remove lifted key from heldKeys
    if(heldKeys.includes(18)){//if alt is held
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

const keyDown =(e)=>{//updates heldKeys
    const down=e.which;
    if (e.which===13) addButton.click();
    if(heldKeys.includes(down))return;
    heldKeys.push(down)
}
const inputShortCuts=(e)=>{ //enables input keyboard shortcuts
    
    input.addEventListener('keyup',keyUp);
    input.addEventListener('keydown',keyDown); 
}
const removeInputShortCuts=(e)=>{ //disables input keyboard shortcuts
    input.removeEventListener('keyup',keyUp);
    input.removeEventListener('keydown',keyDown);
    }
const pinPriority=()=>{ //keeps the priority for next input
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
const finishTask=(e)=>{ // marks/unmarks finished tasks, updates counter
    debugger
    const target=e.target;
    const parent=target.parentElement
    const task=parent.getElementsByClassName('todoText')[0]
    if (target.className==='todoTick'){
        if(target.checked){
            task.style.textDecoration= 'line-through';
            task.style.textDecorationColor= 'SteelBlue';
            task.style.color= '#ddd';
            doneTasks++
        }else{
            task.style.textDecoration='';
            task.style.textDecorationColor='';
            task.style.color='';
            doneTasks--
        }
        doneCounter.innerText= doneTasks;
    }
}
addButton.addEventListener('click',addItem);
sortButton.addEventListener('click',sortBy);
pinButton.addEventListener('click',pinPriority)
input.addEventListener('focus',inputShortCuts);
input.addEventListener('blur',removeInputShortCuts);
list.addEventListener('click',finishTask)
prioritySelector.onchange=()=>{
    
    prioritySelector.style.background=priorityColours[prioritySelector.value];
    prioritySelector.style.color= (prioritySelector.value!=='0')?'white':'black';
}
//save features----------------------------------------------------------------
const storage=document.getElementById('storage')
const saveButton=document.getElementById('saveButton')
const loadButton=document.getElementById('loadButton')
const removeButton=document.getElementById('removeButton')
const clearButton=document.getElementById('clearButton')
const storageInput=document.getElementById('storageInput')

const storageActions=(e)=>{
    const target= e.target;
    if(target.id==='storage')return;
    if(target.id==='clearButton'){
        clearStorage();
        return;
    }else if(!storageInput.value){
        storageInput.value='Click to enter a file name';
        return;
    }
    if(target.id==='saveButton'){
        saveStorage();
        return;
    }
    if(target.id==='loadButton'){
        loadStorage();
        return;
    }
    if(target.id==='removeButton'){
        removeStorage();
        return;
    }
}

const saveStorage= ()=>{    
    if(items().length==0){//no list to save
        storageInput.value='No list to save';
        return;
    }
    let file=[];
    for (let x of items()){
        let pri = x.pri 
        let text= x.text
        let time= x.time
        let tick= x.tick
        file.push({pri,text,time,tick});
    }
    localStorage.setItem(storageInput.value,JSON.stringify(file));
    storageInput.value='saved '+storageInput.value;

    }
const loadStorage= ()=>{
    if(!localStorage.getItem(storageInput.value)){//file doesnt exist
        storageInput.value='No such file is saved';
        return;
    }
    let file= JSON.parse(localStorage.getItem(storageInput.value));
    for (let x of file){
        list.appendChild(JSON.parse(x))
    }
    storageInput.value='loaded '+storageInput.value;
    }
const removeStorage= ()=>{
    if(!localStorage.getItem(storageInput.value)){//file doesnt exist
        storageInput.value='No such file is saved';
        return;
    }
    localStorage.removeItem(storageInput.value);
    storageInput.value='Removed '+storageInput.value;
    }
const clearStorage= ()=>{
    localStorage.clear();
    storageInput.value='Storage Cleared'
}
storage.addEventListener('click',storageActions)
