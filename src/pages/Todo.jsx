import React, { useEffect } from 'react'
import { useState ,useRef} from 'react';
import { v4 as uuidv4 } from 'uuid';

import { RxCross2 } from "react-icons/rx";

import TodoItem from '../components/TodoItem';


const Todo = () => {
   const [tasks,addtask]=useState([])

   const [ShowPopup,setShowPopUp]=useState({show:false,todoId:null,taskData:null})

   const usertask=useRef()

   const [newText,setNewtext]=useState("")



  const todotaskAdd=()=>{

    if (usertask.current.value.trim() === "") {
        return
      }
    let text=usertask.current.value.split(" ")

    let number=text.pop()

    if(isNaN(number)){
        const todoItem = {
            id: uuidv4(),
            task: usertask.current.value,
            updatedCount: 0,
          };
          const updatedTasks = [...tasks, todoItem];
          addtask(updatedTasks);
          localStorage.setItem("todo-data", JSON.stringify(updatedTasks));

    }else{

    const Todosarr = [];
      for (let i = 0; i < parseInt(number); i++) {
        const todoItem = {
          id: uuidv4(),
          task: text.join(" "),
          updatedCount: 0,
        };
        Todosarr.push(todoItem);
      }
      const updatedTasks = [...tasks, ...Todosarr];
      addtask(updatedTasks);
     localStorage.setItem("todo-data", JSON.stringify(updatedTasks));

    }


    usertask.current.value=" "

  }


  const todoDelete=(delId)=>{
    const modifieddata=tasks.filter((each)=>each.id!==delId)
    addtask(modifieddata);
    localStorage.setItem("todo-data", JSON.stringify(modifieddata));
  }

  const updateCount = (id) => {
    //console.log(id)
    //const updatedText=userupdateTask.current.value
    //console.log(updatedText)
    console.log(newText)
    const updatedList = tasks.map((todo) =>
      todo.id === id ? { ...todo, updatedCount: todo.updatedCount + 1,task:newText } : todo
    );
    addtask(updatedList);
    localStorage.setItem("todo-data", JSON.stringify(updatedList));
    setShowPopUp({ show:false,todoId:null,taskData:null})
  }; 

 // {ShowPopup.show && UpdatedModel(setShowPopUp.taskData,ShowPopup.todoId)}

  useEffect(() => {
    const todosList = JSON.parse(localStorage.getItem("todo-data"));
    if (todosList) {
        addtask(todosList);
    }
  }, []);


  const UpdatedModel = (data,id) => {
   // console.log(data,id)
    return (
      <div className="bg-cyan-400 px-5 py-2 absolute top-[40%] left-[15%] md:left-[40%] md:h-[20vh] md:w-[25vw] h-[25vh] w-[70vw] rounded-lg">
        <div className="flex items-center justify-between">
          <h3 className="font-normal text-xl">Edit Task</h3>
          <RxCross2
            className="text-2xl"
            onClick={() => setShowPopUp({ show:false,todoId:null,taskData:null})}
          />
        </div>
        <div className="mt-4 flex flex-col">
          <input
            className="h-8 w-full rounded-md text-gray-900 outline-none px-3"
            type="text"
            placeholder="Edit task"
            value={data}
            onChange={(e) => setNewtext(e.target.value)}
          />
          <button
            className="bg-blue-700 rounded-md py-1.5 px-6 text-md mt-3 self-end"
           onClick={()=>updateCount(id)}
          >
            Save
          </button>
        </div>
      </div>
    );
  };



  return (
    <div className='bg-teal-600 px-3 md:px-6 py-4 rounded-lg w-[85%] h-[90vh] md:w-[50%]'>
      <h1 className='self-center font-bold text-lg text-white mt-10'>Day Goals!</h1>


      <div className='flex  mt-5'>
            <input type="text"  placeholder="Enter Your Task" ref={usertask} className='h-10 w-72  rounded-md outline-none text-gray-800 font-semibold  text-md'/>
            <button onClick={todotaskAdd} className='bg-blue-900 rounded-md py-1.5 px-6 text-md ml-5'>Add Todo</button>
      </div>

      <div className='mt-5 mb-3'>
        <h1 className='mt-7 mb-3 text-xl font-semibold'>YOUR TASKS</h1>
        {tasks.length>0 ?(
         <ul className='px-3 h-[53vh] overflow-auto custom-scrollbar'>
            {tasks.map((each)=><TodoItem key={each.id} data={each} todoDelete={todoDelete} setNewtext={setNewtext} setShowPopUp={setShowPopUp}/>)}
         </ul> 
         ):
         (
        <div>
          <h1>Welcome! to Todo let's Get Add your Tasks </h1>
        </div>
         )}
      </div>
 
 {ShowPopup.show && UpdatedModel(ShowPopup.taskData,ShowPopup.todoId)}

 

    </div>
  )
}

export default Todo
