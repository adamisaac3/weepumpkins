'use client'
import { notFound, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";
import Spinner from "../../multi-use/Spinner";
import Image from "next/image";
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
    
    useEffect(() => {
        const fetchOrder = async () => {
            const response = await fetch(`/api/get-order?payment_intent=${payment_intent}`)
            const {order_info, items_info}: ApiResponse = await response.json()
            
            if(!order_info || !items_info){
                notFound();
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
                notFound()
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


    function hasDecimal(num: number) {
        return num % 1 !== 0;
    }

    function formatDate(date: Date){
        return format(date, 'do MMM')
    }

    return(
        <>
            <div className="thank-you">
                <h1 className="thanks-order">Thanks for your Order!</h1>
                <h2 className="other-thanks">Thank you for supporting my small business!</h2>
                <h2 className="scissors">Please be careful when opening your box. Scissors may damage the item(s) inside</h2>
            </div>
            {loading && 
                <Spinner />
            }
            {!loading && order &&
                <div className="order">
                    <div className="order-info">
                        <div className="order-shipping">
                            <h2 className="order-num">Order #{order?.id}</h2>
                            <div className="order-loc">
                                <p>Shipping to {`${order.address}, `}
                                    {order.apartment ? order.apartment.length > 0 ? order.apartment : "" : ''}
                                    {`${order.city} ${order.state} ${order.zipcode}, ${order.country}`}
                                </p>
                                <p>We'll send an email to {order.email} shortly.</p>
                            </div>
                        </div>
                    </div>
                    {items && 
                        <div className="shipment">
                            <div className="shipment-head">
                                <h2>Shipment</h2>
                                {estimatedDates && 
                                    <h3>{`Estimated Delivery: ${formatDate(estimatedDates[0])} - ${formatDate(estimatedDates[1])}`}</h3>
                                }
                                
                            </div>
                            <div className="order-items">
                                {items.map((row) => {
                                    return(
                                        <>
                                            <div key={row.id} className="item">
                                                <Image className="item-image" alt="order item image" width={125} height={125} src={`https://jejfpctlmwnzbjejiljo.supabase.co/storage/v1/object/public/files/${row.category_id}/${row.image_path}`} />
                                                <div className="item-info">
                                                    <p>{row.name} - {row.id}</p>
                                                    <p>$ {hasDecimal(row.price) ? row.price : row.price.toFixed(2)}</p>
                                                    <p>Qty: {row.quantity}</p>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })}
                            </div>
                            <div className="bottom-row">
                                <div className="price">
                                    <p>Total price: </p>
                                    <p>$ {hasDecimal(order.price) ? order.price : order.price.toFixed(2)}</p>
                                </div>
                                <button className="bottom-btn">Continue Shopping</button>
                            </div>
                        </div>
                    }
                </div>
            }
        </>
    )
}