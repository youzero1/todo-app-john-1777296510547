import { useEffect } from 'react';
import type { FilterType } from '@/types/index';

type UseKeyboardShortcutsOptions = {
  onFocusInput: () => void;
  onClearCompleted: () => void;
  onToggleAll: () => void;
  onFilterChange: (filter: FilterType) => void;
  hasTodos: boolean;
  hasCompleted: boolean;
};

export function useKeyboardShortcuts({
  onFocusInput,
  onClearCompleted,
  onToggleAll,
  onFilterChange,
  hasTodos,
  hasCompleted,
}: UseKeyboardShortcutsOptions) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      const isTyping =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable;

      // '/' or 'n' — focus the input (only when not already typing)
      if (!isTyping && (e.key === '/' || e.key === 'n')) {
        e.preventDefault();
        onFocusInput();
        return;
      }

      // Escape — blur any focused input
      if (e.key === 'Escape' && isTyping) {
        (target as HTMLInputElement).blur();
        return;
      }

      // Only run shortcut keys when not typing
      if (isTyping) return;

      // '1' — show All
      if (e.key === '1') {
        onFilterChange('all');
        return;
      }

      // '2' — show Active
      if (e.key === '2') {
        onFilterChange('active');
        return;
      }

      // '3' — show Completed
      if (e.key === '3') {
        onFilterChange('completed');
        return;
      }

      // 't' — toggle all todos
      if (e.key === 't' && hasTodos) {
        onToggleAll();
        return;
      }

      // 'x' — clear completed
      if (e.key === 'x' && hasCompleted) {
        onClearCompleted();
        return;
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onFocusInput, onClearCompleted, onToggleAll, onFilterChange, hasTodos, hasCompleted]);
}
