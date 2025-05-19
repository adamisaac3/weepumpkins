import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../utils/supabase/server";

export async function GET(req: NextRequest){
    const supabase = await createClient();

    const {data: { user }} = await supabase.auth.getUser();

   
    if(user){
        const {data: cart, error} = await supabase.rpc('get_cart', {param_user_id: user.id});
        
        if(!error && cart){
            return NextResponse.json(cart)
        }
        
    }


    return NextResponse.json({noCart: "Theres no cart"})
}