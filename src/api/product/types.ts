
export type ResponseProduct = {
    status: string,
    statusCode: number,
    data:
      {
        title: string,
        sub_title: string,
        description: string,
        image: string,
        quantity_sold: number,
        id: string,
        category_type_id: string,
        user_id: string,
        created_at: string,
        updated_at: string
    }[],
    message: []
}