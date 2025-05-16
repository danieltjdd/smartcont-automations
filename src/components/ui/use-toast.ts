import { useState, useCallback } from "react";

type Toast = {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
};

const [toasts, setToasts] = useState<Toast[]>([]);

export const toast = useCallback(({ title, description, action, variant }: Omit<Toast, "id">) => {
  const id = Math.random().toString(36).substring(2, 9);
  setToasts((prev) => [...prev, { id, title, description, action, variant }]);
  setTimeout(() => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, 5000);
}, []);

export function useToast() {
  return { toasts, toast };
}
