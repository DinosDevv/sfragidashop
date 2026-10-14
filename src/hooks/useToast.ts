"use client";

import { useSyncExternalStore } from "react";
import * as toastStore from "@/lib/toastStore";

export function useToast() {
  return useSyncExternalStore(toastStore.subscribe, toastStore.getSnapshot, toastStore.getServerSnapshot);
}
