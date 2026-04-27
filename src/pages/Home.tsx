import { useTodos } from '@/hooks/useTodos';
import TodoInput from '@/components/todo/TodoInput';
import TodoList from '@/components/todo/TodoList';
import TodoFooter from '@/components/todo/TodoFooter';
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

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>My Todos</h1>
          <p className={styles.subtitle}>Stay organised, stay productive</p>
        </header>

        <TodoInput onAdd={addTodo} onToggleAll={toggleAll} hasTodos={todos.length > 0} />

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
      </div>
    </div>
  );
}
