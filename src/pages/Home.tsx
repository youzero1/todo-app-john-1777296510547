import { useRef, useState, useCallback } from 'react';
import { Keyboard } from 'lucide-react';
import { useTodos } from '@/hooks/useTodos';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import TodoInput from '@/components/todo/TodoInput';
import TodoList from '@/components/todo/TodoList';
import TodoFooter from '@/components/todo/TodoFooter';
import ShortcutsHelp from '@/components/todo/ShortcutsHelp';
import styles from './Home.module.css';

export default function Home() {
  const {
    filteredTodos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    toggleAll,
    activeCount,
    completedCount,
    todos,
  } = useTodos();

  const inputRef = useRef<HTMLInputElement>(null);
  const [showShortcuts, setShowShortcuts] = useState(false);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const toggleShortcuts = useCallback(() => {
    setShowShortcuts((v) => !v);
  }, []);

  useKeyboardShortcuts({
    onFocusInput: focusInput,
    onClearCompleted: clearCompleted,
    onToggleAll: toggleAll,
    onFilterChange: setFilter,
    hasTodos: todos.length > 0,
    hasCompleted: completedCount > 0,
  });

  // '?' toggles shortcuts help (handled separately so we can also listen in the panel)
  useState(() => {
    function handleQuestion(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      const isTyping =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable;
      if (!isTyping && e.key === '?') {
        setShowShortcuts((v) => !v);
      }
      if (e.key === 'Escape') {
        setShowShortcuts(false);
      }
    }
    window.addEventListener('keydown', handleQuestion);
    return () => window.removeEventListener('keydown', handleQuestion);
  });

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>My Todos</h1>
          <p className={styles.subtitle}>Stay organised, stay productive</p>
        </header>

        <TodoInput
          onAdd={addTodo}
          onToggleAll={toggleAll}
          hasTodos={todos.length > 0}
          inputRef={inputRef}
        />

        {todos.length > 0 && (
          <>
            <TodoList
              todos={filteredTodos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
            <TodoFooter
              activeCount={activeCount}
              completedCount={completedCount}
              filter={filter}
              onFilterChange={setFilter}
              onClearCompleted={clearCompleted}
            />
          </>
        )}

        {todos.length === 0 && (
          <div className={styles.empty}>
            <p className={styles.emptyText}>No todos yet. Add one above!</p>
          </div>
        )}

        <button
          className={styles.shortcutsBtn}
          onClick={toggleShortcuts}
          title="Keyboard shortcuts (?)"
          aria-label="Show keyboard shortcuts"
        >
          <Keyboard size={16} />
          <span>Shortcuts</span>
        </button>
      </div>

      <ShortcutsHelp open={showShortcuts} onClose={() => setShowShortcuts(false)} />
    </div>
  );
}
