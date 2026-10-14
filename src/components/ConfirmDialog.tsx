"use client";

import { useEffect, useRef } from "react";
import Icon, { type IconName } from "./Icon";

type Props = {
  open: boolean;
  title: string;
  message?: string;
  confirmLabel: string;
  cancelLabel?: string;
  icon?: IconName;
  onConfirm: () => void;
  onCancel: () => void;
};

// Native <dialog>: focus trapping, Esc to close and top-layer rendering come for free.
export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel,
  cancelLabel = "Ακύρωση",
  icon = "trash",
  onConfirm,
  onCancel,
}: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      // Default to the safe choice for keyboard users.
      cancelRef.current?.focus();
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onCancel}
      onClick={(e) => {
        // Clicks on the dialog element itself land on the backdrop.
        if (e.target === e.currentTarget) onCancel();
      }}
      aria-labelledby="confirm-dialog-title"
      className="m-auto w-[calc(100%-2rem)] max-w-sm rounded-lg p-0 shadow-xl backdrop:bg-black/50 open:animate-dialog-in open:backdrop:animate-backdrop-in motion-reduce:animate-none"
    >
      <div className="p-6">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 sm:mx-0">
          <Icon name={icon} className="h-6 w-6" />
        </div>
        <h2 id="confirm-dialog-title" className="mt-4 text-center text-lg font-semibold sm:text-left">
          {title}
        </h2>
        {message && <p className="mt-2 text-center text-sm text-gray-600 sm:text-left">{message}</p>}
        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            ref={cancelRef}
            onClick={onCancel}
            className="rounded border px-4 py-2 font-medium transition-transform hover:bg-gray-100 active:scale-95"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className="rounded bg-red-600 px-4 py-2 font-medium text-white transition-transform hover:bg-red-700 active:scale-95"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </dialog>
  );
}
