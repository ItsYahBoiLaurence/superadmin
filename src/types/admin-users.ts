import type { AccessTokenQueryType } from "./payload"

export interface AdminUsers {
    first_name: string
    last_name: string
    email: string
    department: {
        company_id: string
    }
}

export type AuthContextType = {
    token: string | null
    login: (payload: LoginPayload) => Promise<void>;
    logout: () => void
}

export type LoginPayload = {
    email: string,
    password: string
}