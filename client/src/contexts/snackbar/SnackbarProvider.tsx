import { createContext, useState, type ReactNode } from "react";
import { type SnackbarContextType, type SnackbarMessage } from "./types";
import Snackbar from "../../components/snackbar/Snackbar";
import styles from "./SnackbarPRovider.module.scss";

export const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<SnackbarMessage[]>([]);

  const pushMessage = (message: Omit<SnackbarMessage, "id">) => {
    setMessages((prev) => [{ ...message, id: crypto.randomUUID() }, ...prev]);
  };

  const removeMessage = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <SnackbarContext.Provider value={{ pushMessage }}>
      {children}
      <div className={styles.container}>
        {messages.map((m) => (
          <Snackbar
            key={m.id}
            message={m.message}
            type={m.type}
            onDismiss={() => removeMessage(m.id)}
          />
        ))}
      </div>
    </SnackbarContext.Provider>
  );
};
