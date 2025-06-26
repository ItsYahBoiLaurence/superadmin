export function FormatDate(stringedDate: string) {

    const date = new Date(stringedDate)

    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
    }).format(date);
}