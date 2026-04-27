import { Keyboard, X } from 'lucide-react';
import styles from './ShortcutsHelp.module.css';

type ShortcutsHelpProps = {
  open: boolean;
  onClose: () => void;
};

const SHORTCUTS = [
  { keys: ['/', 'N'], description: 'Focus the input' },
  { keys: ['Esc'], description: 'Dismiss input / close dialog' },
  { keys: ['T'], description: 'Toggle all todos' },
  { keys: ['X'], description: 'Clear completed todos' },
  { keys: ['1'], description: 'Show All todos' },
  { keys: ['2'], description: 'Show Active todos' },
  { keys: ['3'], description: 'Show Completed todos' },
  { keys: ['?'], description: 'Show / hide this help' },
];

export default function ShortcutsHelp({ open, onClose }: ShortcutsHelpProps) {
  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true" aria-label="Keyboard shortcuts">
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <div className={styles.panelHeader}>
          <div className={styles.panelTitle}>
            <Keyboard size={18} />
            <span>Keyboard Shortcuts</span>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <ul className={styles.list}>
          {SHORTCUTS.map((s) => (
            <li key={s.description} className={styles.row}>
              <span className={styles.desc}>{s.description}</span>
              <span className={styles.keys}>
                {s.keys.map((k) => (
                  <kbd key={k} className={styles.kbd}>{k}</kbd>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
