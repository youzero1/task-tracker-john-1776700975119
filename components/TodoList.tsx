'use client';

import { Todo } from '@/types';
import TodoItem from '@/components/TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

export default function TodoList({ todos, onToggle, onDelete, onEdit }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="py-16 text-center">
        <div className="text-6xl mb-4">✨</div>
        <p className="text-gray-400 text-sm">No tasks here!</p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-50">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
