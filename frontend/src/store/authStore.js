import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

const userAuthStore = create(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,
        setUser: (user) => set({ user, isAuthenticated: true }),

        userLogout: async () => {
          try {
            await fetch("http://localhost:5000/user/logout", {
              method: "POST",
              credentials: "include", // Include cookies for logout
            });
            set({ user: null, isAuthenticated: false});
          } catch (error) {
            console.error("Logout error:", error);
          }
        },
        
        adminLogout: async () => {
          try {
            await fetch("http://localhost:5000/admin/logout", {
              method: "POST",
              credentials: "include", // Include cookies for logout
            });
            set({ user: null, isAuthenticated: false});
          } catch (error) {
            console.error("Logout error:", error);
          }
        }

      }),
      {
        name: "user-auth-storage", // A unique key for sessionStorage
        storage: createJSONStorage(() => sessionStorage), // Specify sessionStorage
      }
    )
  )
);

export default userAuthStore;
