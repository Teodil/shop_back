import * as TE from "fp-ts/TaskEither"
import { db } from "../infrastructure/db/db"

export const addProduct = (userId:number, productId: number) =>
    TE.right (
        (()=>{
            console.log(userId),
            console.log(productId)
            const cart = db.carts.find(item => item.userId === userId)
            const cartIndex = db.carts.findIndex(item => item.userId === userId)
            if(cart) {
                cart.productIds.push(productId)
                db.carts = db.carts.splice(cartIndex, 1, cart)
            }
            else {
                db.carts.push({userId, productIds: [productId]})
            }

            return db.carts[cartIndex];
        })()
    )

export const getCart = (userId: number)=>
    TE.right(
        db.carts.filter(cart => cart.userId === userId)
    )