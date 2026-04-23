import { RegisterForm } from "./IRegisterForm";

export type Tab = "login" | "register";

export interface AuthTabsProps {
  loginProps: {
    error?: string;
    onSubmit: (data: { email: string; password: string }) => void;
  };
  registerProps: {
    loading: boolean;
    error?: string;
    onSubmit: (data: RegisterForm) => Promise<void>;
  };
  defaultTab?: Tab;
}
