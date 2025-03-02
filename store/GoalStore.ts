import { create } from "zustand";

interface Goal {
  id?: string; // Include ID for updates & deletions
  goalName: string;
  catergory: string;
  status: string;
  priority: string;
  date: string;
  description?: string;
  progress?: number;
  createdAt?: string;
}

interface GoalStore {
  goals: Goal[];
  loading: boolean;
  deleteLoading: boolean;
  error: string | null;

  fetchGoals: () => Promise<void>;
  addGoal: (
    goal: Goal,
    progressNumber: number
  ) => Promise<{ success: boolean; message: string }>;
  deleteGoal: (id: string) => Promise<{ success: boolean; message: string }>;
  updateGoal: (
    goal: Goal,
    progressNumber: number,
    goalId: string,
  ) => Promise<{ success: boolean; message: string }>;
}

export const useGoalStore = create<GoalStore>((set, get) => ({
  goals: [],
  loading: true,
  deleteLoading: false,
  error: null,

  fetchGoals: async () => {
    set((state) => {
      if ((state.goals ?? []).length > 0) {
        return {};
      }
      return { loading: true, error: null };
    });
    try {
      const response = await fetch(`api/goals/get`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      set({ goals: data.goals, loading: false });
    } catch (err) {
      console.error(err);
      set({
        error: "Error fetching goals! Please try again",
        loading: false,
      });
    }
  },

  addGoal: async (goal, progressNumber: number) => {
    try {
      const bodyData = { ...goal, progress: progressNumber || 0 }; // Ensure progress is set

      const response = await fetch("/api/goals/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      const responseText = await response.text();
      const data = JSON.parse(responseText);

      if (response.ok) {
        set((state) => ({ goals: [...state.goals, data.goal] }));
        return { success: true, message: "Goal added successfully" };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.log(`Error in goal store ${error}`);
      return { success: false, message: "Error adding goal" };
    } finally {
      set({ loading: false });
    }
  },

  deleteGoal: async (id: string) => {
    set({ deleteLoading: true });
    try {
      const response = await fetch(`/api/goals/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();
      if (response.ok) {
        set((state) => ({
          goals: state.goals.filter((goal) => goal.id !== id),
        }));
        return { success: true, message: "Goal deleted successfully" };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error(error);
      return { success: false, message: "Error deleting project" };
    } finally {
      set({ deleteLoading: false });
    }
  },

  updateGoal: async (goal: Goal, progressNumber: number, goalId: string) => {
    try {
      set({ loading: true });
      const bodyData = {...goal, progress: progressNumber || 0, id: goalId }; 
      const response = await fetch(`/api/goals/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });
      const data = await response.json();
      if (response.ok) {
        const updatedGoals = get().goals.map((g) =>
          g.id === goalId? {...g,...goal } : g
        );
        set({ goals: updatedGoals });
        return { success: true, message: "Goal updated successfully" };
      } else {
        return { success: false, message: data.message };
      }
    } catch (err) {
      console.log(err);
      return { success: false, message: "Error Updating goal"}
    } finally {
      set({ loading: false });
    }
  },

}));

