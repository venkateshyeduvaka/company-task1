import React from 'react'




import { MdModeEditOutline } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const TodoItem = ({data,todoDelete,setShowPopUp,setNewtext}) => {
    const {id,task,updatedCount}=data


  return (
    <div className='bg-[#2f4e87] rounded-md px-2 py-2 text-lg flex items-center justify-between my-3'>
        <p>{task} <span className="ml-3 text-sm">{`( Updated ${updatedCount} ${updatedCount === 1 ? "time" : "times"} )`}</span></p>
        <div className='flex items-center gap-4 pr-3'>
          <MdModeEditOutline className="text-xl" onClick={()=>setShowPopUp({show:true,todoId:id,taskData:task},setNewtext(task))}/>
          <RxCross2 className="text-lg text-red-700" onClick={()=>todoDelete(id)}/>
        </div>
    </div>
  )
}

export default TodoItem
