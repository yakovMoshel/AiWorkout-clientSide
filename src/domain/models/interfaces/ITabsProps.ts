export interface TabsProps {
  tabs: string[];
  activeTab: string;
  onTabClick: (tab: string) => void;
  className?: string;
  tabClassName?: string;
  activeTabClassName?: string;
}