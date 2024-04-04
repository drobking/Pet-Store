export interface IProduct{
    id:string;
    title:string;
    brand:string;
    createdAt:string;
    updatedAt:string;
}
export interface ICreateUpdateProductDTO{
    brand:string;
    title:string;
    
}
export interface ICreateUpdateProductId{
    id:string;
    cuPdto:ICreateUpdateProductDTO;
}