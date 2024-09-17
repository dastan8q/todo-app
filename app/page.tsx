"use client";
import Image from "next/image";
import { useState, ChangeEvent, KeyboardEvent } from 'react';

interface TodoItem {
  id: string;
  content: string;
  category: string;
}

export default function Home() {
  const [todo, setTodo] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Trabajo');

  const getRandomNumber = (): number => {
    return Math.floor(Math.random() * 9999);
  };

  const handleKeyUp = (key: string) => {
    if (key === 'Enter' && newTodo) {
      const randomNumber = getRandomNumber();

      const newItem: TodoItem = {
        id: `item-${randomNumber}`,
        content: newTodo,
        category: selectedCategory,
      };

      setTodo(todo.concat(newItem));
      setNewTodo('');
    }
  };

  const handleDelete = (id: number) => {
    if (id > -1) {
      setTodo(todo.slice(0, id).concat(todo.slice(id + 1)));
    }
  };

  return (
    <div className="flex justify-center pt-40">
      <div className="max-w-sm w-full shadow-lg bg-white p-8 rounded-xl opacity-70">
        <div className="flex justify-center cursor-default bg-gray-200 rounded-3xl px-4 py-1 color-gray hover:scale-110 transition-all">
          <img className="object-cover rounded-full w-16 h-16 m-2" src="https://i.pinimg.com/originals/42/9b/b4/429bb47fcda0b84f88ec04fbe9ac2328.jpg" alt="theprince" />
          <div className="w-full p-3">
            <p className="text-3xl text-gray-600">My To-do list</p>
          </div>
        </div>

        <div className="relative mt-10">
          <div className="absolute bottom-14 inset-y-0 left-2 flex items-center pl-3 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
          </div>
          <input
            type="text"
            id="newTodo"
            value={newTodo}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setNewTodo(e.target.value)}
            onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => handleKeyUp(e.key)}
            className="block w-full pl-10 p-2 border-4 rounded-full bg-gray-600 text-white"
            placeholder="Nueva tarea"
          />
          <div className="mt-4">
            <select
              value={selectedCategory}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedCategory(e.target.value)}
              className="block w-full p-2 border-2 rounded-full bg-gray-600 text-white"
            >
              <option value="Trabajo">Trabajo</option>
              <option value="Estudio">Estudio</option>
              <option value="Quehaceres">Quehaceres</option>
              <option value="Diligencias">Diligencias</option>
            </select>
          </div>
        </div>

        <ul className="block w-full pt-6">
          {todo?.map((item, index) => {
            return (
              <li key={item.id} className="w-full border-2 rounded-xl mt-2 hover:border-blue-300">
                <input id={`checkbox-${index}`} type="checkbox" className="float-left block w-6 h-6 m-3" />
                <button id={`button-${index}`} onClick={() => handleDelete(index)} className="float-right w-7 h-7 m-2.5 rounded-2xl bg-red-700 text-gray-200 shadow-md hover:bg-red-500 hover:scale-105">
                  x
                </button>
                <label htmlFor={`checkbox-${index}`} className="block w-full p-3">
                  {item.content}
                  <span className="text-gray-500 ml-2">({item.category})</span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
