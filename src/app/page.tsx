/** @format */

"use client";
import { useEffect, useState } from "react";
import Todo from "./Todo";
import { ITodo } from "./models/todo";

export default function Home() {
  const [currentTodo, setCurrentTodo] = useState<ITodo>({
    name: '',
    description: '',
    status: false,
    duedate: ''
  });

  const [todos, setTodos] = useState<ITodo[]>([]);


  useEffect(() => {
    fetch('/api/v1/todo',{
      method: 'GET'
    }).then(res=>res.json()).then(data=>{
      const todo = data.data as any;
      setTodos(todo);
    });
  }, []);

  
  function AddHandler() {
    fetch("/api/v1/todo", {
      method: "POST",
      body: JSON.stringify({
        name: currentTodo.name,
        description: currentTodo.description,
        status: currentTodo.status,
        duedate: currentTodo.duedate,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        
        setCurrentTodo({
          name: "",
          description: "",
          status: false,
          duedate: "",
        });

        const todo = data.data;
        setTodos([...todos, todo]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function DeleteHandler(todoId: string) {
    fetch("/api/v1/todo", {
      method: "DELETE",
      body: JSON.stringify({
        id: todoId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const todo_id = data.data._id;
        const copy_todo = [...todos];
        const todo_todelete = copy_todo.findIndex((x) => x._id == todo_id);
        copy_todo.splice(todo_todelete, 1);
        setTodos(copy_todo);
      });
  }

  function toggleStatusHandler(todoId: string) {
    let todo_to_update = todos.findIndex((x) => x._id == todoId);

    fetch("/api/v1/todo", {
      method: "PUT",
      body: JSON.stringify({
        id: todoId,
        status: todos[todo_to_update].status,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const copy_todo = [...todos];
        copy_todo[todo_to_update].status = !copy_todo[todo_to_update].status;
        setTodos(copy_todo);
      });
  }

  return (
    <>
      <div className="flex justify-center py-8 bg-gradient-to-r from-purple-300 to-indigo-300 min-h-screen">
        <div className="container bg-white shadow-2xl border border-gray-200 p-10 rounded-3xl max-w-4xl">
          <p className="text-4xl font-bold text-center mb-6 text-gray-900">Todo App</p>
          <div className="grid gap-y-6">
            <div className="grid gap-y-6 p-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl shadow-inner">
              <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-x-6 items-center">
                <label className="sm:col-span-1 lg:col-span-1 text-lg font-semibold text-gray-800">ชื่อเรื่อง:</label>
                <input 
                  type="text" 
                  id="name" 
                  className="border border-gray-300 rounded-xl p-3 sm:col-span-1 lg:col-span-2 focus:ring-4 focus:ring-purple-300 shadow-md"
                  onChange={(event) => {
                    setCurrentTodo({
                      ...currentTodo,
                      name: event.target.value
                    });
                  }} 
                  value={currentTodo.name} 
                />
              </div>
              <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-x-6 items-center">
                <label className="sm:col-span-1 lg:col-span-1 text-lg font-semibold text-gray-800">รายละเอียด:</label>
                <input 
                  type="text" 
                  id="description" 
                  className="border border-gray-300 rounded-xl p-3 sm:col-span-1 lg:col-span-2 focus:ring-4 focus:ring-purple-300 shadow-md"
                  onChange={(event) => {
                    setCurrentTodo({
                      ...currentTodo,
                      description: event.target.value
                    });
                  }} 
                  value={currentTodo.description} 
                />
              </div>
              <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-x-6 items-center">
                <label className="sm:col-span-1 lg:col-span-1 text-lg font-semibold text-gray-800">วันครบกำหนด:</label>
                <input 
                  type="datetime-local" 
                  id="date" 
                  className="border border-gray-300 rounded-xl p-3 sm:col-span-1 lg:col-span-2 text-center focus:ring-4 focus:ring-purple-300 shadow-md"
                  onChange={(event) => {
                    setCurrentTodo({
                      ...currentTodo,
                      duedate: event.target.value
                    });
                  }} 
                  value={currentTodo.duedate} 
                />
              </div>
              <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-x-6">
                <button 
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-lg font-semibold rounded-xl p-3 w-full sm:col-span-1 lg:col-span-3 hover:bg-indigo-700 transition transform hover:scale-105"
                  onClick={AddHandler}
                >
                  เพิ่ม
                </button>
              </div>
            </div>
          </div>
          <hr className="my-8 border-gray-300" />
          <div className="grid gap-y-6">
            {todos.map((todo, index) => {
              return <Todo key={index} todo={todo} deleteHandler={DeleteHandler} toggleStatusHandler={toggleStatusHandler} />
            })}
          </div>
        </div>
      </div>
    </>
  );
}
