import Button from "../atoms/Button";

interface TabsProps {
  tabs: string[];
  activeTab: string;
  onTabClick: (tab: string) => void;
  className?: string;
  tabClassName?: string;
  activeTabClassName?: string;
}

export default function Tabs({ tabs, activeTab, onTabClick, className, tabClassName, activeTabClassName }: TabsProps) {
  return (
    <div className={className}>
      {tabs.map(tab => (
        <Button
          key={tab}
          type="button"
          onClick={() => onTabClick(tab)}
          className={`${tabClassName} ${activeTab === tab ? activeTabClassName : ""}`}
        >
          {tab}
        </Button>
      ))}
    </div>
  );
}