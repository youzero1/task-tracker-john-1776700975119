'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
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
  const [showShortcuts, setShowShortcuts] = useState(false);
  const addInputRef = useRef<HTMLInputElement>(null);

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

  const clearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  }, []);

  const cycleFilter = useCallback((direction: 'next' | 'prev') => {
    const filters: FilterType[] = ['all', 'active', 'completed'];
    setFilter((current) => {
      const idx = filters.indexOf(current);
      if (direction === 'next') return filters[(idx + 1) % filters.length];
      return filters[(idx - 1 + filters.length) % filters.length];
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName.toLowerCase();
      const isTyping = tag === 'input' || tag === 'textarea';

      // ? — show shortcuts modal (always)
      if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
        setShowShortcuts((v) => !v);
        return;
      }

      // Escape — close shortcuts modal
      if (e.key === 'Escape') {
        setShowShortcuts(false);
        return;
      }

      // Block other shortcuts when typing in an input
      if (isTyping) return;

      switch (e.key) {
        case 'n':
        case 'N':
          // Focus add input
          e.preventDefault();
          addInputRef.current?.focus();
          break;
        case 'c':
        case 'C':
          // Clear completed
          clearCompleted();
          break;
        case '1':
          setFilter('all');
          break;
        case '2':
          setFilter('active');
          break;
        case '3':
          setFilter('completed');
          break;
        case 'ArrowRight':
        case 'l':
          cycleFilter('next');
          break;
        case 'ArrowLeft':
        case 'h':
          cycleFilter('prev');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [clearCompleted, cycleFilter]);

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
            <AddTodo onAdd={addTodo} inputRef={addInputRef} />
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
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
            <button
              onClick={() => setShowShortcuts(true)}
              className="text-xs text-gray-400 hover:text-violet-500 transition-colors duration-200 flex items-center gap-1"
            >
              <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-500 font-mono">?</kbd>
              <span>Keyboard shortcuts</span>
            </button>
            {completedCount > 0 && (
              <button
                onClick={clearCompleted}
                className="text-sm text-gray-400 hover:text-red-500 transition-colors duration-200"
              >
                Clear completed ({completedCount})
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Modal */}
      {showShortcuts && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowShortcuts(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-gray-800">Keyboard Shortcuts</h2>
              <button
                onClick={() => setShowShortcuts(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-2">
              {[
                { keys: ['N'], description: 'Focus new task input' },
                { keys: ['C'], description: 'Clear completed tasks' },
                { keys: ['1'], description: 'Show all tasks' },
                { keys: ['2'], description: 'Show active tasks' },
                { keys: ['3'], description: 'Show completed tasks' },
                { keys: ['←', 'H'], description: 'Previous filter' },
                { keys: ['→', 'L'], description: 'Next filter' },
                { keys: ['?'], description: 'Toggle this dialog' },
                { keys: ['Esc'], description: 'Close this dialog' },
              ].map(({ keys, description }) => (
                <div key={description} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{description}</span>
                  <div className="flex items-center gap-1">
                    {keys.map((key) => (
                      <kbd
                        key={key}
                        className="px-2 py-1 bg-gray-100 border border-gray-200 rounded-lg text-xs font-mono text-gray-700 min-w-[28px] text-center"
                      >
                        {key}
                      </kbd>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
