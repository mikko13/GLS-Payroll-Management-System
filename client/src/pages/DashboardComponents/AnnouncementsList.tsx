import React from "react";
import { Bell } from "lucide-react";
import { AnnouncementProps } from "./types";

type AnnouncementItemProps = AnnouncementProps

const AnnouncementItem: React.FC<AnnouncementItemProps> = ({ title, content, date }) => {
  return (
    <div className="p-6 border-b border-blue-100 last:border-b-0">
      <div className="flex justify-between items-start">
        <h3 className="font-medium text-gray-800">{title}</h3>
        <span className="text-xs text-gray-500">{date}</span>
      </div>
      <p className="mt-2 text-sm text-gray-600">{content}</p>
    </div>
  );
};

interface AnnouncementsListProps {
  announcements: AnnouncementProps[];
}

const AnnouncementsList: React.FC<AnnouncementsListProps> = ({ announcements }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-blue-100">
      <div className="px-6 py-4 border-b border-blue-100 flex items-center">
        <Bell size={16} className="text-blue-600 mr-2" />
        <h2 className="text-lg font-medium text-blue-800">Announcements</h2>
      </div>
      <div className="divide-y divide-blue-100">
        {announcements.map((announcement, index) => (
          <AnnouncementItem key={index} {...announcement} />
        ))}
      </div>
    </div>
  );
};

export default AnnouncementsList;