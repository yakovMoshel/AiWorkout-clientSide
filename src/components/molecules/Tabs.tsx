import { TabsProps } from "../../domain/models/interfaces/ITabsProps";
import Button from "../atoms/Button";


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