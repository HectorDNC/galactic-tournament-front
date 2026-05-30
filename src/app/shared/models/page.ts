export interface PageInfo {
    size: number;
    number: number; // current page (0-based)
    totalElements: number;
    totalPages: number;
}

export interface Page<T> {
    content: T[];
    page: PageInfo;
}