import React from 'react'
import { ITodo } from './models/todo';

export default function Todo({ todo, deleteHandler, toggleStatusHandler }: { todo: ITodo, deleteHandler: (todoId: string) => void, toggleStatusHandler: (todoId: string) => void }) {
    
    const timeConvert = (time: string) => {
        const date = new Date(time);
        return date.toLocaleString();
    }

    return (
        <div className='grid grid-cols-7 hover:bg-slate-200 p-2 items-center rounded-xl text-center'>
            <div className='col-span-1'style={{textDecoration: todo.status == false ? 'none' : 'line-through'}}>
                {todo.name}
            </div>
            <div className='col-span-2'style={{textDecoration: todo.status == false ? 'none' : 'line-through'}}>
                {todo.description}
            </div>
            <div className='col-span-1'style={{textDecoration: todo.status == false ? 'none' : 'line-through'}}>
                {todo.status ? 'เสร็จแล้ว' : 'ยังไม่เสร็จ'}
            </div>
            <div className='col-span-2'style={{textDecoration: todo.status == false ? 'none' : 'line-through'}}>
                {timeConvert(todo.duedate)}
            </div>
            <div className='col-span-1 flex flex-col gap-2'>
            
                <button 
                    className={`${
                        todo.status ? 'bg-yellow-500' : 'bg-green-500'
                    } text-white rounded-lg p-2 w-full`}
                    onClick={() => { toggleStatusHandler(todo._id as string); }}
                >
                    {todo.status ? 'ไม่สำเร็จ' : 'สำเร็จ'}
                </button>
                <button 
                    className="bg-red-500 text-white rounded-lg p-2 w-full"
                    onClick={() => { deleteHandler(todo._id as string) }}
                >
                    ลบ
                </button>
            </div>
        </div>
    )
}