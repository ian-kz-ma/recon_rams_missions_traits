export interface IListing {
    id: number,
    name: string,
    description: string,
    initStock: number,
    currentStock: number,
    cost: number,
    imageUrl?: string
    collectedWallets: Array<string>
}