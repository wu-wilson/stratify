import { type User, onAuthStateChanged } from "firebase/auth";
import { type UserContextType } from "./types";
import { auth } from "./config";
import { useTheme } from "../theme/ThemeProvider";
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import Spinner from "../../components/spinner/Spinner";
import styles from "./AuthProvider.module.scss";

const AuthContext = createContext<UserContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { darkMode } = useTheme();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <div className={darkMode ? "dark-mode" : "light-mode"}>
        <div className={styles["container"]}>
          <Spinner size={50} text={"Authenticating..."} />
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};
