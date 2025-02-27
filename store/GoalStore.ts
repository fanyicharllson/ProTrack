import { create } from "zustand";

interface Goal {
  id?: string; // Include ID for updates & deletions
  goalName: string;
  catergory: string;
  status: string;
  priority: string;
  date: string;
  description?: string;
  progress: number;
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
  ) => Promise<{ success: boolean; message: string }>;
  deleteGoal: (
    goalId: string,
    userId: string
  ) => Promise<{ success: boolean; message: string }>;
}

export const useGoalStore = create<GoalStore>((set) => ({
  goals: [],
  loading: true,
  deleteLoading: false,
  error: null,

  fetchGoals: async () => {
    set((state) => {
      if (state.goals.length > 0) {
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

  addGoal: async (goal) => {
    set({ loading: true, error: null });
    try {
      const goalWithProgress = {
        ...goal,
        progress: goal.progress ?? 0,
      };
      const response = await fetch("/api/goals/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(goalWithProgress),
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
       console.log(`Error in goal store ${error}`) 
      return { success: false, message: "Error adding goal" };
    } finally {
      set({ loading: false });
    }
  },

  // ✅ Delete a goal (Only for the current user)
  deleteGoal: async (goalId: string, userId: string) => {
    set({ deleteLoading: true, error: null });
    try {
      const response = await fetch(`/api/goals/${goalId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }), // Send userId to ensure only their goal gets deleted
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      set((state) => ({
        goals: state.goals.filter((goal) => goal.id !== goalId),
      }));

      return { success: true, message: "Goal deleted successfully" };
    } catch (error: any) {
      return { success: false, message: error.message };
    } finally {
      set({ deleteLoading: false });
    }
  },
}));
