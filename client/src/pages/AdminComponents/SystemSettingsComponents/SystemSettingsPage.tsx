import { useState, useEffect } from "react";
import Sidebar from "../SidebarComponents/Sidebar";
import Header from "../HeaderComponents/Header";
import SystemSettingsContent from "./SystemSettingsContent";
import axios from "axios";
import { toast } from "sonner";

interface IPosition {
  _id: string;
  title: string;
  isActive: boolean;
}

interface IDepartment {
  _id: string;
  name: string;
  isActive: boolean;
}

const SystemSettingsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSidebarItem, setActiveSidebarItem] = useState("System Settings");

  // Update state types to match MongoDB models
  const [positions, setPositions] = useState<IPosition[]>([]);
  const [departments, setDepartments] = useState<IDepartment[]>([]);
  const [newPosition, setNewPosition] = useState("");
  const [newDepartment, setNewDepartment] = useState("");
  const serverURL = import.meta.env.VITE_API_BASE_URL;
  
  useEffect(() => {
    fetchPositionsAndDepartments();
  }, []);

  const fetchPositionsAndDepartments = async () => {
    try {
      const positionsResponse = await axios.get(
        `${serverURL}/api/system/positions`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const departmentsResponse = await axios.get(
        `${serverURL}/api/system/departments`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Update to use the data property from API response
      setPositions(positionsResponse.data.data);
      setDepartments(departmentsResponse.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load system settings data");
    }
  };

  const handleAddPosition = async () => {
    if (!newPosition.trim()) {
      toast.error("Position name cannot be empty");
      return;
    }

    try {
      await axios.post(
        `${serverURL}/api/system/positions`,
        { title: newPosition },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setNewPosition("");
      fetchPositionsAndDepartments();
      toast.success("Position added successfully");
    } catch (error) {
      console.error("Error adding position:", error);
      toast.error("Failed to add position");
    }
  };

  const handleUpdatePosition = async (id: string, title: string) => {
    try {
      const position = positions.find((p) => p._id === id);
      if (!position) return;

      await axios.put(
        `${serverURL}/api/system/positions/${id}`,
        { title, isActive: position.isActive },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchPositionsAndDepartments();
      toast.success("Position updated successfully");
    } catch (error) {
      console.error("Error updating position:", error);
      toast.error("Failed to update position");
    }
  };

  const handleUpdateDepartment = async (id: string, name: string) => {
    try {
      const department = departments.find((p) => p._id === id);
      if (!department) return;

      await axios.put(
        `${serverURL}/api/system/departments/${id}`,
        { name, isActive: department.isActive },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchPositionsAndDepartments();
      toast.success("department updated successfully");
    } catch (error) {
      console.error("Error updating department:", error);
      toast.error("Failed to update department");
    }
  };

  const handleTogglePositionStatus = async (
    id: string,
    currentStatus: boolean
  ) => {
    try {
      await axios.patch(
        `${serverURL}/api/system/positions/${id}/toggle`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchPositionsAndDepartments();
      toast.success("Position status updated");
      return Promise.resolve(); // Add explicit Promise resolution for the PositionsTab component
    } catch (error) {
      console.error("Error toggling position status:", error);
      toast.error("Failed to update position status");
      return Promise.reject(error); // Return the rejected promise so the component can catch it
    }
  };

  const handleToggleDepartmentStatus = async (
    id: string,
    currentStatus: boolean
  ) => {
    try {
      await axios.patch(
        `${serverURL}/api/system/departments/${id}/toggle`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchPositionsAndDepartments();
      toast.success("Department status updated");
      return Promise.resolve();
    } catch (error) {
      console.error("Error toggling department status:", error);
      toast.error("Failed to update department status");
      return Promise.reject(error);
    }
  };

  const handleAddDepartment = async () => {
    if (!newDepartment.trim()) {
      toast.error("Department name cannot be empty");
      return;
    }

    try {
      await axios.post(
        `${serverURL}/api/system/departments`,
        { name: newDepartment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setNewDepartment("");
      fetchPositionsAndDepartments();
      toast.success("Department added successfully");
    } catch (error) {
      console.error("Error adding department:", error);
      toast.error("Failed to add department");
    }
  };

  const handleDeletePosition = async (positionId: string) => {
    try {
      await axios.delete(
        `${serverURL}/api/system/positions/${positionId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchPositionsAndDepartments();
      toast.success("Position deleted successfully");
    } catch (error) {
      console.error("Error deleting position:", error);
      toast.error("Failed to delete position");
    }
  };

  const handleDeleteDepartment = async (departmentId: string) => {
    try {
      await axios.delete(
        `${serverURL}/api/system/departments/${departmentId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchPositionsAndDepartments();
      toast.success("Department deleted successfully");
    } catch (error) {
      console.error("Error deleting department:", error);
      toast.error("Failed to delete department");
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar
        sidebarOpen={sidebarOpen}
        activeSidebarItem={activeSidebarItem}
        setActiveSidebarItem={setActiveSidebarItem}
        setSidebarOpen={setSidebarOpen}
      />
      <div
        className="flex-1 flex flex-col h-screen overflow-hidden"
        style={{ background: "linear-gradient(135deg, #f8fafc, #f0f4f8)" }}
      >
        <Header />
        <SystemSettingsContent
          positions={positions}
          departments={departments}
          newPosition={newPosition}
          newDepartment={newDepartment}
          setNewPosition={setNewPosition}
          setNewDepartment={setNewDepartment}
          handleAddPosition={handleAddPosition}
          handleAddDepartment={handleAddDepartment}
          handleDeletePosition={handleDeletePosition}
          handleDeleteDepartment={handleDeleteDepartment}
          handleUpdatePosition={handleUpdatePosition}
          handleUpdateDepartment={handleUpdateDepartment}
          handleTogglePositionStatus={handleTogglePositionStatus}
          handleToggleDepartmentStatus={handleToggleDepartmentStatus}
        />
      </div>
    </div>
  );
};

export default SystemSettingsPage;
