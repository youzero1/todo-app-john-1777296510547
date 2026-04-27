import { useState, useRef, useEffect } from 'react';
import { Trash2, Pencil, Check, X } from 'lucide-react';
import clsx from 'clsx';
import type { Todo } from '@/types/index';
import { formatDate } from '@/lib/utils';
import styles from './TodoItem.module.css';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  function handleEditSubmit() {
    if (editValue.trim()) {
      onEdit(todo.id, editValue);
    } else {
      setEditValue(todo.text);
    }
    setEditing(false);
  }

  function handleEditKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleEditSubmit();
    if (e.key === 'Escape') {
      setEditValue(todo.text);
      setEditing(false);
    }
  }

  return (
    <li className={clsx(styles.item, todo.completed && styles.completed)}>
      <button
        className={clsx(styles.checkbox, todo.completed && styles.checkboxChecked)}
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'}
        type="button"
      >
        {todo.completed && <Check size={13} strokeWidth={3} />}
      </button>

      <div className={styles.content}>
        {editing ? (
          <input
            ref={inputRef}
            className={styles.editInput}
            value={editValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditValue(e.target.value)}
            onBlur={handleEditSubmit}
            onKeyDown={handleEditKeyDown}
          />
        ) : (
          <span
            className={clsx(styles.text, todo.completed && styles.textCompleted)}
            onDoubleClick={() => !todo.completed && setEditing(true)}
          >
            {todo.text}
          </span>
        )}
        <span className={styles.date}>{formatDate(todo.createdAt)}</span>
      </div>

      <div className={styles.actions}>
        {!todo.completed && !editing && (
          <button
            type="button"
            className={clsx(styles.actionBtn, styles.editBtn)}
            onClick={() => setEditing(true)}
            aria-label="Edit todo"
          >
            <Pencil size={15} />
          </button>
        )}
        {editing && (
          <button
            type="button"
            className={clsx(styles.actionBtn, styles.cancelBtn)}
            onClick={() => { setEditValue(todo.text); setEditing(false); }}
            aria-label="Cancel edit"
          >
            <X size={15} />
          </button>
        )}
        <button
          type="button"
          className={clsx(styles.actionBtn, styles.deleteBtn)}
          onClick={() => onDelete(todo.id)}
          aria-label="Delete todo"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </li>
  );
}
