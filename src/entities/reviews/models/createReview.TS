export default interface CreateReview {
    id: string;
    content: string;
    rating: number;
    createdAt: number;
    userId: string;
    placeId: string;
}