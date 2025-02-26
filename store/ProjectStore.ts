import { create } from "zustand";

interface Project {
  projectName: string;
  type: string;
  status: string;
  date: string;
  mainStack: string[];
  projectUrl?: string;
  budget?: string;
  description?: string;
  createdAt?: string; // Include createdAt
}

interface ProjectStore {
  projects: Project[];
  loading: boolean;
  deleteLoading: boolean;  //
  error: string | null;
  fetchProjects: () => Promise<void>;
  addProject: (
    project: Project
  ) => Promise<{ success: boolean; message: string }>;
  deleteProject: (
    projectName: string
  ) => Promise<{ success: boolean; message: string }>;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  loading: true,
  deleteLoading: false,  //
  error: null,
  fetchProjects: async () => {
    set((state) => {
      if (state.projects.length > 0) {
        return {}; // Don't set loading if projects are already available
      }
      return { loading: true, error: null };
    });
    try {
      const response = await fetch("/api/projects/get");
      const data = await response.json();
      set({ projects: data, loading: false });
    } catch (err) {
      console.error(err);
      set({
        error: "Error fetching projects! Please try again",
        loading: false,
      });
    }
  },

  addProject: async (project) => {
    try {
      const response = await fetch("/api/projects/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      });
      const data = await response.json();
      if (response.ok) {
        set((state) => ({
          projects: [
            ...state.projects,
            { ...project, createdAt: new Date().toISOString() },
          ],
        }));
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message };
      }
    } catch (err) {
      console.error(err);
      return { success: false, message: "Error adding project" };
    }
  },

  deleteProject: async (projectName) => {
    set({ deleteLoading: true });  
    try {
      const response = await fetch("/api/projects/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ projectName }),
      });
      const data = await response.json();
      if (response.ok) {
        set((state) => ({
          projects: state.projects.filter(
            (project) => project.projectName !== projectName
          ),
        }));
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message };
      }
    } catch (err) {
      console.error(err);
      return { success: false, message: "Error deleting project" };
    } finally {
      set({ deleteLoading: false });
    }
  },
}));
