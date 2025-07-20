export type SortOption = 'default' | 'popular' | 'price' | 'rating';

export interface IFilterParams {
    region?: string;
    city?: string;
    sort?: SortOption;
}