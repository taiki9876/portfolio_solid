export type Shop = {
    id: number;
    name: string;
    appDisplayName: string | undefined;
    images: ShopImage[];
    businessHours: string | undefined;
    rest: string | undefined;
    tel: string | undefined;
    address: string | undefined;
    prelusion: string | undefined;
    hpUrl: string | undefined;
    mapUrl: string | undefined;
    customerCount: number;
    createdAt: Date;
};

export type ShopImage = {
    id: number;
    path: string;
    sortOrder: number;
};
