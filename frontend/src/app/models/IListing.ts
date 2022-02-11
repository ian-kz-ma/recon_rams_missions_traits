export interface IListing {
    id: string,
    name: string,
    description: string,
    init_stock: number,
    current_stock: number,
    price: number,
    image_url?: string,
    enabled: boolean,
    listing_time: Date
}

