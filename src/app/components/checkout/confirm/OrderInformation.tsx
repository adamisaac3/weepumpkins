'use client'
import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import Spinner from "../../multi-use/Spinner";
import AnimatedLink from "../../multi-use/AnimatedLink";
import { useCartStore } from "@/app/stores/useCartStore";
import {format} from 'date-fns'

type OrderInfo = {
    payment_intent: string,
    price: number,
    name: string,
    email: string,
    country: string,
    address: string,
    apartment: string,
    city: string,
    state: string,
    zipcode: string,
    phone: string,
    created_at: string,
    id: string
}

type Items = {
    quantity: number,
    name: string,
    category_id: number,
    image_path: string,
    image_type: string,
    price: number,
    id: number
}

type ApiResponse = {
    order_info: OrderInfo,
    items_info: Items[]
}

export default function ConfirmPageShell(){
    const searchParams = useSearchParams();
    const payment_intent = searchParams?.get('payment_intent')

    const [order, setOrder] = useState<OrderInfo>()
    const [items, setItems] = useState<Items[]>()
    const [loading, setLoading] = useState(true)
    const [estimatedDates, setEstimatedDates] = useState<Date[]>();
    const {removeCartItem} = useCartStore();
    const router = useRouter();
    
    useEffect(() => {
        const fetchOrder = async () => {
            const response = await fetch(`/api/get-order?payment_intent=${payment_intent}`)
            const {order_info, items_info}: ApiResponse = await response.json()

            if(!order_info || !items_info){
                console.log('inside not found')
                router.push('/404');
            }

            if(response.ok){
                setOrder(order_info)
                setItems(items_info)

                if(order_info){
                    const date = new Date(order_info.created_at);

                    const oneWeek = new Date(date)
                    oneWeek.setDate(date.getDate() + 8)

                    const fourWeek = new Date(date);
                    fourWeek.setDate(date.getDate() + 29);

                    setEstimatedDates([oneWeek, fourWeek])
                }
            }
            else{
                router.push('/404')
            }
            
            setLoading(false)
        }
        fetchOrder();
    }, [])
    

    useEffect(() => {
        if(items){
            for(let item of items){
                removeCartItem(item.id);
            }        
        }
    }, [items])

    function formatDate(date: Date){
        return format(date, 'MMMM do, yyyy')
    }

    return (

        <div className="order-confirmation">
            {loading &&
                <Spinner />
            }
            {!loading && order &&
                <>
                    <div className="order">
                        <div className='order-number'>
                            <svg width="64px" height="64px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" >
                                <title>checkmark-circle</title>
                                <desc>Created with Sketch Beta.</desc>
                                <defs>
                                </defs>
                                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" >
                                    <g id="Icon-Set-Filled" transform="translate(-102.000000, -1141.000000)" fill="#3aa44f">
                                        <path d="M124.393,1151.43 C124.393,1151.43 117.335,1163.73 117.213,1163.84 C116.81,1164.22 116.177,1164.2 115.8,1163.8 L111.228,1159.58 C110.85,1159.18 110.871,1158.54 111.274,1158.17 C111.677,1157.79 112.31,1157.81 112.688,1158.21 L116.266,1161.51 L122.661,1150.43 C122.937,1149.96 123.548,1149.79 124.027,1150.07 C124.505,1150.34 124.669,1150.96 124.393,1151.43 L124.393,1151.43 Z M118,1141 C109.164,1141 102,1148.16 102,1157 C102,1165.84 109.164,1173 118,1173 C126.836,1173 134,1165.84 134,1157 C134,1148.16 126.836,1141 118,1141 L118,1141 Z" id="checkmark-circle">
                                        </path>
                                    </g>
                                </g>
                            </svg>
                            <div className="order-num">
                                <p className="number">YOUR ORDER NUMBER IS</p>
                                <p className="order-id">{order.id}</p>
                            </div>
                        </div>
                        <div className="order-delivery">
                            <div className="delivery-info">
                                <p>The estimated delivery date is</p>
                                <p className="estimated-dates">{estimatedDates ? formatDate(estimatedDates[0]) : ''} - {estimatedDates ? formatDate(estimatedDates[1]) : ''}</p>
                            </div>
                            
                            <p>We'll send you an email with all the details.</p>
                        </div>
                    </div>
                    <div className="feedback">
                        <form className="feedback-form">
                            <div className="main-head">
                                <p>I'd love to hear feedback!</p>
                                <p>Any product ideas or things you'd love to see from me?</p>
                            </div>
                            <p className="additional-head">You can also send a <AnimatedLink href="/contact" linkText="personalized message" /> to hear back from me!</p>
                            <textarea className="form-input" required name="recommendation"/>
                            <button className="form-submit" type="submit">SEND</button>
                        </form>
                    </div>
                    <div className="recommendations">
                        <h2 className="recom-head">YOU MAY ALSO LOVE THESE</h2>
                    </div>
                </>
            }
        </div>
    )
}