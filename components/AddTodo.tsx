'use client';

import { useState, RefObject } from 'react';

interface AddTodoProps {
  onAdd: (text: string) => void;
  inputRef?: RefObject<HTMLInputElement>;
}

export default function AddTodo({ onAdd, inputRef }: AddTodoProps) {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        placeholder="Add a new task... (press N to focus)"
        className="flex-1 bg-gray-50 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-violet-400 focus:bg-white transition-all duration-200 text-sm"
      />
      <button
        type="submit"
        disabled={!value.trim()}
        className="bg-gradient-to-r from-violet-500 to-indigo-500 text-white px-5 py-3 rounded-xl font-medium text-sm hover:from-violet-600 hover:to-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-md shadow-violet-200 hover:shadow-lg hover:shadow-violet-300 active:scale-95"
      >
        Add
      </button>
    </form>
  );
}
