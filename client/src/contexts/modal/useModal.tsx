import { createContext, useContext, useState, type ReactNode } from "react";
import { type ModalContextType } from "./types";

export const createModalContext = <T,>() => {
  const ModalContext = createContext<ModalContextType<T> | undefined>(
    undefined
  );

  const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [modal, setModal] = useState<T | null>(null);

    const closeModal = () => {
      setModal(null);
    };

    return (
      <ModalContext.Provider value={{ modal, setModal, closeModal }}>
        {children}
      </ModalContext.Provider>
    );
  };

  const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
      throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
  };

  return { ModalProvider, useModal };
};
