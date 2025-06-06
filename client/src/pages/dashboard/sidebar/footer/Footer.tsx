import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../../../contexts/auth/config";
import { RiLogoutBoxLine, RiSettings3Line } from "react-icons/ri";
import { type SidebarFooterItem } from "./types";
import Spinner from "../../../../components/spinner/Spinner";
import styles from "./Footer.module.scss";

const Footer = ({ expanded }: { expanded: boolean }) => {
  const [signingOut, setSigningOut] = useState<boolean>(false);

  useEffect(() => {
    if (signingOut) {
      logout();
    }
  }, [signingOut]);

  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      navigate("/error", {
        replace: true,
        state: { message: "Firebase sign out endpoint failed" },
      });
    } finally {
      setSigningOut(false);
    }
  };

  const footerItems: SidebarFooterItem[] = [
    {
      icon: RiSettings3Line,
      label: "Account Settings",
      onClick: () => {},
    },
    {
      icon: RiLogoutBoxLine,
      label: "Sign Out",
      onClick: () => setSigningOut(true),
    },
  ];

  if (signingOut) {
    return (
      <div className={styles["sign-out-container"]}>
        <Spinner size={50} text={"Signing out..."} />
      </div>
    );
  }

  return (
    <div className={styles["container"]}>
      {footerItems.map((item) => (
        <div key={item.label} className={styles["item"]} onClick={item.onClick}>
          <item.icon className={styles["icon"]} />
          {expanded && <span className={styles["label"]}>{item.label}</span>}
        </div>
      ))}
    </div>
  );
};

export default Footer;
