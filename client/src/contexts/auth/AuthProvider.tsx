import { type User, onAuthStateChanged } from "firebase/auth";
import { type UserContextType } from "./types";
import { auth } from "./config";
import { useTheme } from "../../hooks/useTheme";
import { type ReactNode, createContext, useEffect, useState } from "react";
import Spinner from "../../components/spinner/Spinner";
import styles from "./AuthProvider.module.scss";

export const AuthContext = createContext<UserContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { darkMode } = useTheme();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [displayName, setDisplayName] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    setDisplayName(user?.displayName ?? null);
  }, [user]);

  if (loading) {
    return (
      <div className={darkMode ? "dark-mode" : "light-mode"}>
        <div className={styles.container}>
          <Spinner size={50} text="Authenticating..." />
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, displayName, setDisplayName }}
    >
      {children}
    </AuthContext.Provider>
  );
};
