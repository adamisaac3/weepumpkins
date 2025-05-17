'use server'
import { createClient } from "../../../../utils/supabase/server";
import {NextResponse} from 'next/server'

export async function AddItemHandler(product_id: number){
    const supabase = await createClient();
    let { data: { user } } = await supabase.auth.getUser();

    if(!user){
        const {data: anonUser, error: anonError} = await supabase.auth.signInAnonymously();

        if(anonError){
            console.log(anonError)
            return;
        }
        
        user = anonUser.user;
    }


    const userId = user!.id;

    const {data: existingCart} = await supabase.from('cart').select('id').eq('user_id', userId).maybeSingle();

    let cartId = existingCart?.id;

    if(!cartId){
        const {data: newCartId} = await supabase.from('cart').insert({user_id: userId}).select('id').single();

        cartId = newCartId;
    }

    const {error: addItemError} = await supabase.from('cart_items').insert({
        cart_id: cartId,
        product_id: product_id,
        quantity: 1,
    })

    if(addItemError){
        console.log("failed to add item " + addItemError)
    }
    else{
        return NextResponse.json({status: 'ok'})
    }

}