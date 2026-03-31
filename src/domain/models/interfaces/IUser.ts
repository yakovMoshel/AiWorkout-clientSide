export interface User {
  id: string;
  email: string;
  name: string;
  age: number;
  height: number;      
  weight: number;
  goal: string;
  image?: string;
  aiUsage: number;
  profileComplete: boolean; 
}