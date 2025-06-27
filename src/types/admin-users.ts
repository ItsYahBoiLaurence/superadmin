export interface AdminUsers {
    first_name: string
    last_name: string
    email: string
    department: {
        company_id: string
    }
}