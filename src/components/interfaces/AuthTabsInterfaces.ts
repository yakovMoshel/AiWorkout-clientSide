export type Tab = "login" | "register";

export interface AuthTabsProps {
  loginProps: { error?: string; onSubmit: (data: any) => void };
  registerProps: { loading: boolean; error?: string; onSubmit: (data: any) => Promise<void> };
  defaultTab?: Tab;
}
