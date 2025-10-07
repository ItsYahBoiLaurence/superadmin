import { create } from "zustand";
import type { AdminUsers } from "../types/admin-users";
import api from "../api";
import { queryClient } from "../queryClient";

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
    updateUser: (payload: AdminUsers) => Promise<void>
}

export type UserManagementType = UserManagementState & UserManagementActions


export const UserManagementStore = create<UserManagementType>(
    (set) => ({
        adminUsers: [],
        openSideBar: false,
        currentUserToEdit: {
            id: "",
            email: "",
            department: {
                company_id: ""
            },
            first_name: "",
            last_name: ""
        },

        openSideBarAction: (user: AdminUsers) => {
            console.log(user)
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
        },

        updateUser: async (payload: AdminUsers) => {
            try {
                const { id, department, ...data } = payload
                console.log("Updated")
                const res = await api.patch(`/mayan-admin/updateUser?id=${id}`, data)
                queryClient.invalidateQueries({ queryKey: 'admin-users' })
                console.log(res.data)
            } catch (error) {
                throw error
            }
        }
    })
) 