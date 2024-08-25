import { create } from "zustand";

export const followStore = create((set, get) => ({
  followedUsers: JSON.parse(localStorage.getItem("followedUsers")) || [],

  followUser: (userName) => {
    const updatedUsers = [...get().followedUsers, userName];
    set({ followedUsers: updatedUsers });
    localStorage.setItem("followedUsers", JSON.stringify(updatedUsers));
  },

  unfollowUser: (userName) => {
    const updatedUsers = get().followedUsers.filter((name) => name !== userName);
    set({ followedUsers: updatedUsers });
    localStorage.setItem("followedUsers", JSON.stringify(updatedUsers));
  },

  isFollowing: (userName) => get().followedUsers.includes(userName),
}));
