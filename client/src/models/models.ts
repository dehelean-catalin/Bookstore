export interface IBook {
	id:string;
	title:string;
	price:number;
	icon:string;
	author:string;
	description:string;
}
export interface IShoppingCartBook extends IBook {
	userId: string
}

export interface IOrder {
    id:number;
	userId: string;
	items:number;
	price:number;
	deliveryStatus:string;
}