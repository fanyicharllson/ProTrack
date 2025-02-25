import { create } from "zustand";

interface Project {
  projectName: string;
  type: string;
  status: string;
  date: string;
  mainStack: string[];
  budget?: string;
  description?: string;
}

interface ProjectStore {
  projects: Project[];
  fetchProjects: () => Promise<void>;
  addProject: (project: Project) => Promise<{success: boolean, message: string}>;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  fetchProjects: async () => {
    try {
      const response = await fetch("/api/projects/get");
      const data = await response.json();
      set({ projects: data });
    } catch (err) {
      console.error(err);
      throw new Error("Error fetching projects from ProjectStore");
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
        await useProjectStore.getState().fetchProjects();
        return { success: true, message: data.message };
      }  else {
        return { success: false, message: data.message };
      }
    } catch (err) {
      console.error(err);
      return { success: false, message: "Error adding project" };
    }
  },
}));
