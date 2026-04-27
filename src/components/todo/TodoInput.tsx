import { useState } from 'react';
import { Plus, ChevronsDown } from 'lucide-react';
import clsx from 'clsx';
import styles from './TodoInput.module.css';

type TodoInputProps = {
  onAdd: (text: string) => void;
  onToggleAll: () => void;
  hasTodos: boolean;
};

export default function TodoInput({ onAdd, onToggleAll, hasTodos }: TodoInputProps) {
  const [value, setValue] = useState('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onAdd(value);
    setValue('');
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {hasTodos && (
        <button
          type="button"
          className={styles.toggleAll}
          onClick={onToggleAll}
          title="Toggle all"
        >
          <ChevronsDown size={18} />
        </button>
      )}
      <input
        className={clsx(styles.input, hasTodos && styles.inputWithToggle)}
        type="text"
        placeholder="What needs to be done?"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        autoFocus
      />
      <button
        type="submit"
        className={styles.addButton}
        disabled={!value.trim()}
        title="Add todo"
      >
        <Plus size={20} />
      </button>
    </form>
  );
}
