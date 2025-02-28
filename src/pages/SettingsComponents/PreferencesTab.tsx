// components/PreferencesTab.tsx
import { Palette, Globe, Clock, Settings, Moon, Sun, Save } from "lucide-react";

interface PreferencesTabProps {
  theme: string;
  setTheme: (theme: string) => void;
  language: string;
  setLanguage: (language: string) => void;
  autoLogout: string;
  setAutoLogout: (autoLogout: string) => void;
}

const PreferencesTab = ({
  theme,
  setTheme,
  language,
  setLanguage,
  autoLogout,
  setAutoLogout,
}: PreferencesTabProps) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-gray-800">
          System Preferences
        </h2>
        <button
          type="button"
          className="bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white px-3 py-2 rounded-md text-sm flex items-center transition-all duration-200 shadow-md"
        >
          <Save size={16} className="mr-2" />
          Save Changes
        </button>
      </div>

      <div className="space-y-6">
        <div className="p-4 border border-blue-100 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Palette size={20} className="mr-3 text-blue-800" />
              <div>
                <h3 className="font-medium text-gray-800">Theme</h3>
                <p className="text-sm text-gray-500">
                  Choose your preferred interface theme
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                className={`p-2 rounded-md flex items-center ${
                  theme === "light"
                    ? "bg-blue-100 text-blue-800 border border-blue-200"
                    : "bg-white text-gray-500 border border-gray-200"
                }`}
                onClick={() => setTheme("light")}
              >
                <Sun size={18} />
              </button>
              <button
                className={`p-2 rounded-md flex items-center ${
                  theme === "dark"
                    ? "bg-blue-100 text-blue-800 border border-blue-200"
                    : "bg-white text-gray-500 border border-gray-200"
                }`}
                onClick={() => setTheme("dark")}
              >
                <Moon size={18} />
              </button>
              <button
                className={`p-2 rounded-md flex items-center ${
                  theme === "system"
                    ? "bg-blue-100 text-blue-800 border border-blue-200"
                    : "bg-white text-gray-500 border border-gray-200"
                }`}
                onClick={() => setTheme("system")}
              >
                <Settings size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 border border-blue-100 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Globe size={20} className="mr-3 text-blue-800" />
              <div>
                <h3 className="font-medium text-gray-800">Language</h3>
                <p className="text-sm text-gray-500">
                  Select your preferred language
                </p>
              </div>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="border border-blue-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="zh">Chinese</option>
            </select>
          </div>
        </div>

        <div className="p-4 border border-blue-100 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Clock size={20} className="mr-3 text-blue-800" />
              <div>
                <h3 className="font-medium text-gray-800">Auto Logout</h3>
                <p className="text-sm text-gray-500">
                  Set the time before automatic logout due to inactivity
                </p>
              </div>
            </div>
            <select
              value={autoLogout}
              onChange={(e) => setAutoLogout(e.target.value)}
              className="border border-blue-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            >
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="120">2 hours</option>
              <option value="0">Never</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreferencesTab;
