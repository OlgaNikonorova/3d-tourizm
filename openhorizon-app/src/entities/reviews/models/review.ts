export default interface Review {
    id: string;
    content: string;
    rating: number;
    createdAt: number;
    userId: string;
    placeId: string;
}