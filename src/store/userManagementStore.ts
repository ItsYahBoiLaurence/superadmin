import { create } from "zustand";
import type { AdminUsers } from "../types/admin-users";

export type UserManagementState = {
    adminUsers: AdminUsers[]
    openSideBar: boolean
    currentUserToEdit: AdminUsers
}

export type UserManagementActions = {
    setAdminUsers: (users: AdminUsers[]) => Promise<void>
    deleteUserAction: (user: AdminUsers) => Promise<void>
    openSideBarAction: (user: AdminUsers) => void
    toggle: () => void
}

export type UserManagementType = UserManagementState & UserManagementActions


export const UserManagementStore = create<UserManagementType>(
    (set) => ({
        adminUsers: [],
        openSideBar: false,
        currentUserToEdit: {
            email: "",
            department: {
                company_id: ""
            },
            first_name: "",
            last_name: ""
        },

        openSideBarAction: (user: AdminUsers) => {
            set({
                openSideBar: true,
            })
            set({
                currentUserToEdit: user
            })
        },

        toggle: () => {
            set({ openSideBar: false })
        },

        deleteUserAction: async (user: AdminUsers) => {
            console.log(`${user}`)
        },

        setAdminUsers: async (users) => {
            set({
                adminUsers: users
            })
        }
    })
) 