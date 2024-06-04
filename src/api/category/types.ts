
export type ResponseCategory = {
    status: string;
    statusCode: number;
    data: {
        categoryProduct: {
            id: string;
            name: string;
            type: string;
            created_at: string;
            updated_at: string;
        }[],
        categoryService:{
            id: string;
            name: string;
            type: string;
            created_at: string;
            updated_at: string;
        }[]
    };
    message: string[];
}
