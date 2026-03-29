import { useState } from "react";
import Button from "../atoms/Button";
import styles from "../../styles/AuthTabs.module.css";
import LoginForm from "../organisms/LoginForm";
import RegisterForm from "../organisms/RegisterForm";

import type { Tab, AuthTabsProps } from "../interfaces/AuthTabsInterfaces";

export default function AuthTabs({ loginProps, registerProps, defaultTab = "login" }: AuthTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>(defaultTab);

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <Button
          className={`${styles.tab} ${activeTab === "login" ? styles.active : ""}`}
          onClick={() => setActiveTab("login")}
        >
          Login
        </Button>
        <Button
          className={`${styles.tab} ${activeTab === "register" ? styles.active : ""}`}
          onClick={() => setActiveTab("register")}
        >
          Register
        </Button>
      </div>

      <div className={styles.content}>
        {activeTab === "login" ? (
          <LoginForm {...loginProps} error={loginProps.error ?? ""} />
        ) : (
          <RegisterForm {...registerProps} error={registerProps.error ?? ""} />
        )}
      </div>
    </div>
  );
}