// elements
const list= document.getElementById('view');
const control = document.getElementById('control');
const input = document.getElementById('textInput');
const prioritySelector =document.getElementById('prioritySelector');
const addButton =document.getElementById('addButton');
const counter= document.getElementById('counter')
const errorLabel= document.getElementById('errorLabel')
const sortButton= document.getElementById('sortButton')
const items=()=>{
    const items= [];
    for(let x of document.getElementsByClassName('todoContainer')){
        let item =x;
        let pri = x.getElementsByClassName('todoPriority')[0].value;
        let text= x.getElementsByClassName('todoText')[0].innerText;
        let time= x.getElementsByClassName('todoCreatedAt')[0].value;
       items.push({item,pri,text,time});
    }
    return items
} 
const sortSelect=document.getElementById('sortByButton')
const pinButton= document.getElementById('priorityPin')

//useful resources
let priority_pinned = false;// pin button pressed
const time= new Date();
const year= time.getFullYear();
const month= (time.getMonth()<9)? '0'+(time.getMonth()+1):time.getMonth()+1;
const day= time.getDate();
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
    todoPriority.value= prioritySelector.value
    todoPriority.style.background=priorityColours[prioritySelector.value];
    todoPriority.innerText= prioritySelector.value;
    item.appendChild(todoPriority);
    //text
    const todoText= create('div');
    todoText.className= 'todoText';
    todoText.innerText= input.value;
    item.appendChild(todoText);
    //mark finished tasks
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
const sortBy=()=>{
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
const keyUp=(e)=>{
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
const itemHover=(e)=>{
    const target=e.target;
    if(items().includes(target.parentElement)) target.parentElement.getElementsByClassName('todoText')[0].style.textDecoration= 'line-through';
    if(items().includes(target))target.getElementsByClassName('todoText')[0].style.textDecoration= 'line-through';
}
addButton.addEventListener('click',addItem);
sortButton.addEventListener('click',sortBy);
pinButton.addEventListener('click',pinPriority)
input.addEventListener('focus',inputShortCuts);
input.addEventListener('blur',removeInputShortCuts);
list.addEventListener('click',itemHover)
prioritySelector.onchange=()=>{
    
    prioritySelector.style.background=priorityColours[prioritySelector.value];
    prioritySelector.style.color= (prioritySelector.value!=='0')?'white':'black';
}