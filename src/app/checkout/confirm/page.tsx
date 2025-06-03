import { useRouter } from "next/router"


export default function ConfirmPage(){
    
    const router = useRouter();
    const {payment_intent} = router.query
    
    
    return(
        <p>Confirm page</p>
    )
}