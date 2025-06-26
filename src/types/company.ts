export interface BaseCompany {
    name: string
}

export interface Company extends BaseCompany {
    date_created: string
    employee_count: number
}

