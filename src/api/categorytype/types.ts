export type ResponseCategoryType = {
    status: string;
    statusCode: number;
    data: {
        results: {
            id: string;
            name: string;
            category_id: string;
            created_at: string;
            updated_at: string;
            category: {
                id: string;
                name: string;
                created_at: string;
                updated_at: string;
            }
        }[]
    };
    message: string[];
}