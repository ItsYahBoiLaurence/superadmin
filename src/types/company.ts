export interface BaseCompany {
    name: string
}

export interface Company extends BaseCompany {
    id: string
    date_created: string
    employee_count: number
}

