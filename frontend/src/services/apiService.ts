// apiService file
import axios from "axios";
import { toast } from "react-toastify";

const API_BASE_URL = "http://localhost:8080/api";

interface Task {
  title: string;
  description: string;
}

export const authService = {
  login: async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.data.message)
    }
  },

  signup: async (name: string, email: string, password: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        name,
        email,
        password,
      });
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.data.message)
    }
  },

  getUserProfile: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/auth/user-details`, {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Get task details failed");
    }
  },
};

export const taskService = {
  addTaskApi: async (task: Task) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/task/create`, task, {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      });

      return response.data;
    } catch (error) {
      throw new Error("Add task failed");
    }
  },

  editTask: async (task: any) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/task/${task.id}`,
        task,
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Edit task failed");
    }
  },

  getTaskDetails: async (taskId: number) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/task/${taskId}`, {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Get task details failed");
    }
  },

  getTasksApi: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/task/get-all`, {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      });
      return response.data;
    } catch (error) {
      // throw new Error("Get tasks failed");
    }
  },

  deleteTaskApi: async (taskId: number): Promise<void> => {
    try {
      await axios.delete(`${API_BASE_URL}/task/${taskId}`, {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      });
    } catch (error) {
      throw new Error("Delete task failed");
    }
  },
};
