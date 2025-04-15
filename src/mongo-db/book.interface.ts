export interface BookI {
    title: string;
    description: string;
    coverUrl: string;
    contentUrl: string;
    status: 'PENDING' | 'APPROVED';
    sellerId: string; 
}