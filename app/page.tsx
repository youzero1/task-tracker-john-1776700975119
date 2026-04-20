'use client';

import { useState } from 'react';
import TodoList from '@/components/TodoList';
import AddTodo from '@/components/AddTodo';
import FilterTabs from '@/components/FilterTabs';
import { Todo, FilterType } from '@/types';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: '1', text: 'Build a Next.js todo app', completed: true, createdAt: new Date() },
    { id: '2', text: 'Add beautiful styling with Tailwind', completed: true, createdAt: new Date() },
    { id: '3', text: 'Deploy to production', completed: false, createdAt: new Date() },
  ]);
  const [filter, setFilter] = useState<FilterType>('all');

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: string, newText: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-100 via-purple-50 to-indigo-100">
      <div className="max-w-2xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 mb-2">
            My Todos
          </h1>
          <p className="text-gray-500 text-sm">
            {activeCount} task{activeCount !== 1 ? 's' : ''} remaining
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-violet-100 overflow-hidden">
          {/* Add Todo */}
          <div className="p-6 border-b border-gray-100">
            <AddTodo onAdd={addTodo} />
          </div>

          {/* Filter Tabs */}
          <div className="px-6 pt-4">
            <FilterTabs
              filter={filter}
              onFilterChange={setFilter}
              allCount={todos.length}
              activeCount={activeCount}
              completedCount={completedCount}
            />
          </div>

          {/* Todo List */}
          <div className="px-6 pb-4">
            <TodoList
              todos={filteredTodos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          </div>

          {/* Footer */}
          {completedCount > 0 && (
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={clearCompleted}
                className="text-sm text-gray-400 hover:text-red-500 transition-colors duration-200"
              >
                Clear completed ({completedCount})
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
