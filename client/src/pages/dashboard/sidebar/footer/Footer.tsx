import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../../../contexts/auth/config";
import { RiLogoutBoxLine, RiSettings3Line } from "react-icons/ri";
import { type SidebarFooterItem } from "./types";
import Spinner from "../../../../components/spinner/Spinner";
import Tooltip from "../../../../components/tooltip/Tooltip";
import Modal from "../../../../components/modal/Modal";
import Settings from "./settings/Settings";
import styles from "./Footer.module.scss";

const Footer = ({ expanded }: { expanded: boolean }) => {
  const [openSettings, setOpenSettings] = useState<boolean>(false);
  const [signingOut, setSigningOut] = useState<boolean>(false);

  const footerItems: SidebarFooterItem[] = [
    {
      icon: RiSettings3Line,
      label: "Account Settings",
      onClick: () => setOpenSettings(true),
    },
    {
      icon: RiLogoutBoxLine,
      label: "Sign Out",
      onClick: () => setSigningOut(true),
    },
  ];

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

  if (signingOut) {
    return (
      <div className={styles.signOutContainer}>
        <Spinner size={50} text={"Signing out..."} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {openSettings && (
        <Modal setOpen={setOpenSettings}>
          <Settings />
        </Modal>
      )}
      {footerItems.map((item) => (
        <div key={item.label} className={styles.item} onClick={item.onClick}>
          {expanded ? (
            <item.icon className={styles.icon} />
          ) : (
            <Tooltip content={item.label} offset={10}>
              <item.icon className={styles.icon} />
            </Tooltip>
          )}
          {expanded && <span className={styles.label}>{item.label}</span>}
        </div>
      ))}
    </div>
  );
};

export default Footer;
