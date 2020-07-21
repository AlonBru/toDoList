// --------------elements calls--------------
const control = document.getElementById('control');//control panel
const input = document.getElementById('textInput');//input bar
const prioritySelector =document.getElementById('prioritySelector');//priority selection
const addButton =document.getElementById('addButton');//ADD button
const counter= document.getElementById('counter')//status of tasks
const errorLabel= document.getElementById('errorLabel')//input error display(pop-down)
const doneCounter= document.getElementById('doneCounter')//status of finished tasks
const sortButton= document.getElementById('sortButton')//SORT Button
const sortSelect=document.getElementById('sortByButton')//sort type selection
const pinButton= document.getElementById('priorityPin')//priority PIN button(📌)
const list= document.getElementById('view');//task list
const searchBar= document.getElementById('searchBar')//search bar
const searchContainer= document.getElementById('searchContainer')//search container
const searchError= document.getElementById('searchError')//search error message
const searchResults= document.getElementById('searchResults')// search results list

//--------------useful resources--------------
const items=()=>{//used for accessing list items and their information
    const items=[]
    for(let x of document.getElementsByClassName('todoContainer')){
        let item =x;
        let pri = x.getElementsByClassName('todoPriority')[0].value;
        let text= x.getElementsByClassName('todoText')[0].value;
        let time= x.getElementsByClassName('todoCreatedAt')[0].value;
        let tick= x.getElementsByClassName('todoTick')[0].checked;
        items.push({item,pri,text,time,tick});
    }
    return items
} 
let priority_pinned = false;// pin button pressed
let doneTasks=0//number of tasks marked as done
//time functions
const time= new Date();
const year= time.getFullYear();
const month= (time.getMonth()<9)?
    '0'+(time.getMonth()+1):time.getMonth()+1;
const day= time.getDate();
const priorityColours= {//colours code of priorities
    0:'white',
    1:'#009933',
    2:'#DCbF16',
    3:'orangered',
    4:'crimson',
    5:'maroon'
}
const heldKeys=[]//keys held down- for keyboard shortcuts

//--------------functions--------------
//functions for creating elements
const create= (name)=>{//creating new element
        return document.createElement(name);
}
const addItem=()=>{//for adding tasks
    if (checkField()) return;
    //container
    const item= create('div');
    list.appendChild(item)
    item.className='todoContainer';
    //Priority
    addPriority(prioritySelector.value,item)
    //Text
    addText(input.value,item);
    //checkbox
    addTick(false,item)
    //time
    addTime(item);
    //counter
    counter.innerText= items().length
    //reset input fields
    if(!priority_pinned){
        prioritySelector.value=0;
        prioritySelector.style.background=priorityColours[prioritySelector.value];
        prioritySelector.style.color='black';
    }
    input.value=null;
    input.focus();
    // sortList();
}
const addPriority=(input,parent)=>{
    const priority= create('div');
    priority.className= 'todoPriority';
    priority.value= input
    priority.style.background=priorityColours[input];
    priority.innerText= input;
    parent.appendChild(priority);
}
const addText=(input,parent)=>{
    const text= create('div');
    text.className= 'todoText';
    text.innerText= input;
    text.value= input;
    parent.appendChild(text);
}
const addTick=(value,parent)=>{
    const tick= create('input');
    tick.type= 'checkbox';
    tick.className= 'todoTick';
    tick.checked= value;
    if (value===true){
        const task=parent.getElementsByClassName('todoText')[0]
        task.style.textDecoration= 'line-through';
        task.style.textDecorationColor= 'SteelBlue';
        task.style.color= '#ddd';
        doneTasks++
    }
    parent.appendChild(tick);
}
const addTime=(parent)=>{
    const time= create('div');
    time.className= 'todoCreatedAt';
    time.value= new Date;
    time.innerText= `Added at: ${year}-${month}-${day}`
    parent.appendChild(time);
}
//general app functions
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
const sortBy=()=>{//sort direct
    sortList(sortByButton.value)
}
const sortList=(type)=>{//sorting
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
const keyDown =(e)=>{//updates heldKeys for shortcuts
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
const pinPriority=()=>{ //pin button function
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
    
    const target=e.target;
    const parent=target.parentElement
    const task=parent.getElementsByClassName('todoText')[0];
    const className=target.className;
    if (className==='todoTick'){
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
    }debugger
    if(parent.className==='searchResult'){
        const str= task.innerText;
        for (let x of items()){
            const text= x.item.getElementsByClassName('todoText')[0];
            if(x.text===str){
                
                x.item.getElementsByClassName('todoTick')[0].checked= target.checked; 
                if(target.checked){
                    text.style.textDecoration= 'line-through';
                    text.style.textDecorationColor= 'SteelBlue';
                    text.style.color= '#ddd';
                }else{
                    text.style.textDecoration='';
                    text.style.textDecorationColor='';
                    text.style.color='';
                }
            }
            }
    }
    doneCounter.innerText= doneTasks;
}
const search=()=>{//updates search results
    const term=searchBar.value;
    searchError.hidden=true;
    if(term===''){//if input empty
        searchResults.innerHTML='';
        list.style.visibility='';
        return;
    }
    list.style.visibility='hidden';
    const results=[]
    searchResults.innerText='';
    for(let x of items()){
        console.log('x '+x.text+' X',term);
        if(x.text.toLowerCase().includes(term.toLowerCase())){
            const searchResult = x.item.cloneNode('deep');
            searchResult.className= 'searchResult';
            results.push(searchResult);
            searchResults.appendChild(searchResult)
        }
    }
    if (!results.length>0) searchError.hidden=false;

}
//--------------event listeners--------------
addButton.addEventListener('click',addItem);//add button
sortButton.addEventListener('click',sortBy);//sort button
pinButton.addEventListener('click',pinPriority)//pin button
input.addEventListener('focus',inputShortCuts);//input focus (for shortcuts)
input.addEventListener('blur',removeInputShortCuts);//input un-focus(for shortcuts)
list.addEventListener('click',finishTask)//item checkboxes
searchResults.addEventListener('click',finishTask)//search results checkboxes
searchBar.addEventListener('input',search)//searching
prioritySelector.oninput=()=>{//meant to change the color on priority selector, somewhat broken
    
    prioritySelector.style.background=priorityColours[prioritySelector.value];
    prioritySelector.style.color= (prioritySelector.value!=='0')?'white':'black';
}
//storage features----------------------------------------------------------------
//--------------Storage element callers--------------
const storage=document.getElementById('storage')
const saveButton=document.getElementById('saveButton')
const loadButton=document.getElementById('loadButton')
const removeButton=document.getElementById('removeButton')
const clearButton=document.getElementById('clearButton')
const storageInput=document.getElementById('storageInput')
//--------------Storage functions--------------
const storageActions=(e)=>{ redirecton
    const target= e.target;
    if(target.id==='storage')return;
    if(target.id==='storageInput')return;
    if(target.id==='clearButton'){
        clearStorage();
        return;
    }else if(!storageInput.value){
        storageInput.placeholder='Click to enter a file name';
        return;
    }
    if(target.id==='saveButton'){
        saveStorage();
        return;
    }
    if(target.id==='loadButton'||target.id==='appendButton'){
        loadStorage(target.id);
        return;
    }
    if(target.id==='removeButton'){
        removeStorage();
        return;
    }
}
const saveStorage= ()=>{//saving
    if(items().length==0){//no list to save
        storageInput.placeholder='No list to save';
        storageInput.value='';
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
    console.log('save '+file);
    localStorage.setItem(storageInput.value,JSON.stringify(file));
    storageInput.placeholder='saved "'+storageInput.value+'"';
    storageInput.value='';

    }
const loadStorage= (id)=>{//loading\appending load
    if(!localStorage.getItem(storageInput.value)){//file doesn't exist
        storageInput.placeholder=`No such file named "${storageInput.value}" is saved`;
        storageInput.value=''
        return;
    }
    let file= JSON.parse(localStorage.getItem(storageInput.value));
    console.log('load '+file);
    if(id==='loadButton')list.innerHTML='';
    for (let x of file){
        const item= create('div');
       list.appendChild(item)
       item.className='todoContainer';
       //Priority
       addPriority(x.pri,item)
       //Text
       addText(x.text,item);
       //checkbox
       addTick(x.tick,item);
       //time
       addTime(item);
       //counter
        counter.innerText= items().length
    }
    let value=(id==='loadButton')?'loaded ':'appended ';
    storageInput.placeholder=value+'"'+storageInput.value+'"';
    storageInput.value='';
    }
const removeStorage= ()=>{//remove storage items
    if(!localStorage.getItem(storageInput.value)){//file doesn't exist
        storageInput.placeholder=`No file named "${storageInput.value}" is saved`;
        storageInput.value='';
        return;
    }
    localStorage.removeItem(storageInput.value);
    storageInput.placeholder=`Removed "${storageInput.value}"`;
    storageInput.value='';
    }
const clearStorage= ()=>{//clear storage completely
    localStorage.clear();
    storageInput.placeholder='Storage Cleared';
    storageInput.value='';
}
//--------------Storage event listeners--------------
storage.addEventListener('click',storageActions)

