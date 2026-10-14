"use client";

import Link from "next/link";
import { useToast } from "@/hooks/useToast";
import { dismissToast, pauseToast, resumeToast, TOAST_DURATION } from "@/lib/toastStore";
import Icon from "./Icon";

export default function Toaster() {
  const toast = useToast();

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-4 bottom-4 z-[60] flex justify-center sm:inset-x-auto sm:bottom-auto sm:right-4 sm:top-20"
    >
      {toast && (
        <div
          key={toast.id}
          onMouseEnter={pauseToast}
          onMouseLeave={resumeToast}
          className={`group pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg border bg-white shadow-xl motion-reduce:animate-none sm:w-96 ${
            toast.leaving ? "animate-toast-out sm:animate-toast-out-right" : "animate-toast-in sm:animate-toast-in-right"
          }`}
        >
          <div className="flex gap-3 p-4 pb-3">
            <div className="flex h-9 w-9 shrink-0 animate-pop items-center justify-center rounded-full bg-green-100 text-green-700 motion-reduce:animate-none">
              <Icon name="check" className="check-draw h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1 animate-fade-up [animation-delay:120ms] motion-reduce:animate-none">
              <p className="font-semibold">{toast.title}</p>
              {toast.description && <p className="mt-0.5 line-clamp-2 text-sm text-gray-600">{toast.description}</p>}
            </div>
            <button onClick={dismissToast} aria-label="Κλείσιμο" className="-m-1 h-fit p-1 text-gray-400 transition-transform hover:rotate-90 hover:text-gray-700">
              <Icon name="close" className="h-5 w-5" />
            </button>
          </div>
          {(toast.action || toast.dismissLabel) && (
            <div className="flex animate-fade-up gap-2 px-4 pb-4 [animation-delay:200ms] motion-reduce:animate-none">
              {toast.action && (
                <Link
                  href={toast.action.href}
                  onClick={dismissToast}
                  className="flex-1 whitespace-nowrap rounded bg-black px-3 py-2 text-center text-sm font-medium text-white transition-transform hover:bg-gray-800 active:scale-95"
                >
                  {toast.action.label}
                </Link>
              )}
              {toast.dismissLabel && (
                <button
                  onClick={dismissToast}
                  className="flex-1 whitespace-nowrap rounded border px-3 py-2 text-sm font-medium transition-transform hover:bg-gray-100 active:scale-95"
                >
                  {toast.dismissLabel}
                </button>
              )}
            </div>
          )}
          {/* Countdown bar; pauses on hover together with the auto-dismiss timer. */}
          <div
            className="h-1 origin-left animate-toast-progress bg-green-600 group-hover:[animation-play-state:paused]"
            style={{ animationDuration: `${TOAST_DURATION}ms` }}
          />
        </div>
      )}
    </div>
  );
}
