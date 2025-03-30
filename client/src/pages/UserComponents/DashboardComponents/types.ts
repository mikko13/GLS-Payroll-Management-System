export interface StatCardProps {
    title: string;
    value: string;
    change: string;
    iconName: string;
    positive: boolean;
  }
  
  export interface AnnouncementProps {
    title: string;
    content: string;
    date: string;
  }
  
  export interface TaskProps {
    task: string;
    deadline: string;
    priority: "High" | "Medium" | "Low";
  }