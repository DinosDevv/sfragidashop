export type Toast = {
  id: number;
  title: string;
  description?: string;
  action?: { href: string; label: string };
  dismissLabel?: string;
  leaving?: boolean;
};

export const TOAST_DURATION = 4000;
export const TOAST_EXIT_MS = 250;

// Only the latest toast is shown; a new one replaces the previous.
let current: Toast | null = null;
let timer: ReturnType<typeof setTimeout> | undefined;
let remaining = TOAST_DURATION;
let startedAt = 0;
let paused = false;
let nextId = 1;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function startTimer(ms: number) {
  clearTimeout(timer);
  startedAt = Date.now();
  remaining = ms;
  paused = false;
  timer = setTimeout(dismissToast, ms);
}

export function showToast(toast: Omit<Toast, "id" | "leaving">) {
  current = { ...toast, id: nextId++ };
  startTimer(TOAST_DURATION);
  emit();
}

// Plays the exit animation first, then removes the toast.
export function dismissToast() {
  if (!current || current.leaving) return;
  clearTimeout(timer);
  current = { ...current, leaving: true };
  emit();
  timer = setTimeout(() => {
    current = null;
    emit();
  }, TOAST_EXIT_MS);
}

export function pauseToast() {
  if (!current || current.leaving || paused) return;
  clearTimeout(timer);
  remaining -= Date.now() - startedAt;
  paused = true;
}

export function resumeToast() {
  if (!current || current.leaving || !paused) return;
  startTimer(remaining);
}

export function getSnapshot(): Toast | null {
  return current;
}

export function getServerSnapshot(): Toast | null {
  return null;
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
