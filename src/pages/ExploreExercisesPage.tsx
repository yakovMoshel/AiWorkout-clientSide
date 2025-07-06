// src/pages/ExploreExercisesPage.tsx
import { useState } from "react";
import styles from "../styles/ExploreExercisesPage.module.css";
import Tabs from "../components/molecules/Tabs";
import ExerciseFilters from "../components/molecules/Filters";
import ExerciseList from "../components/organisms/ExerciseList";

// Mock data
const mockExercises = [
  {
    id: "001",
    name: "Barbell Bench Press",
    bodyPart: "chest",
    equipment: "barbell",
    gifUrl: "https://example.com/bench.gif",
  },
  {
    id: "002",
    name: "Push-Up",
    bodyPart: "chest",
    equipment: "body weight",
    gifUrl: "https://example.com/pushup.gif",
  },
  {
    id: "003",
    name: "Bodyweight Squat",
    bodyPart: "legs",
    equipment: "body weight",
    gifUrl: "https://example.com/squat.gif",
  },
];

const tabs = ["All", "Favorites", "Recent", "Chest", "Legs"];

export default function ExploreExercisesPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [equipmentFilter, setEquipmentFilter] = useState("");

  const filteredExercises = mockExercises.filter((exercise) => {
    const matchesTab =
      activeTab === "All" ||
      (activeTab === "Favorites" && false) ||
      (activeTab === "Recent" && false) ||
      exercise.bodyPart.toLowerCase() === activeTab.toLowerCase();

    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEquipment =
      !equipmentFilter || exercise.equipment === equipmentFilter;

    return matchesTab && matchesSearch && matchesEquipment;
  });

  return (
    <div className={styles.container}>
      <h3 className={styles.header}>Explore Exercises</h3>
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onTabClick={setActiveTab}
        className={styles.tabs}
        tabClassName={styles.tab}
        activeTabClassName={styles.activeTab}
      />
      <ExerciseFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        equipmentFilter={equipmentFilter}
        onEquipmentChange={setEquipmentFilter}
        className={styles.controls}
        inputClassName={styles.searchInput}
        selectClassName={styles.dropdown}
      />
      <ExerciseList exercises={filteredExercises} className={styles.cardGrid} />
    </div>
  );
}
