import { useQuery } from "react-query"
import type { AdminUsers } from "../types/admin-users"
import api from "../api"
import { UserManagementStore } from "../store"

export default function useUserManagement() {

    const { setAdminUsers, adminUsers } = UserManagementStore()

    const { error, isLoading } = useQuery<AdminUsers[]>({
        queryKey: ['admin-users'],
        queryFn: async () => {
            const { data } = await api.get('/mayan-admin/admin-users')
            setAdminUsers(data)
            return data
        },
        retry: false,
        keepPreviousData: true,
        onError: (err) => {
            console.error('Failed to fetch admin users:', err)
            setAdminUsers([])
        }

    })

    return {
        data: adminUsers ?? [],
        isLoading,
        error
    }
}