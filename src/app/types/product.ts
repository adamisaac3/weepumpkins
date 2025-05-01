export interface Product{
    id : number;
    name : string;
    category : string;
    subcategory? : string;
    description : string;
    price : number;
    images : string[];
}