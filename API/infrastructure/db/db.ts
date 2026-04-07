import { Cart } from "../../domain/cart";
import { Product } from "../../domain/product";
import { User } from "../../domain/user";

export const db = {
    users: [
        {
            id: 423432, 
            username: "user12345", 
            password: "$2b$10$4J5nZkary6hdt0wvBDKh5efiaFBXiuhERz8HScyXb8g0D3zceFaBq"
        }
    ] as User[],
    carts: [] as Cart[],
    products: [
        {id: 1, category:"Телефон", title:"Iphone 17 pro chery tiga pro", price: 99999},
        {id: 2, category:"Телефон", title:"Sasunge", price: 10000},    
    ] as Product[]
}