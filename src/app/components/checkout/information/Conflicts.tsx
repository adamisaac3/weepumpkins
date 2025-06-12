'use client'
import { CartItem } from "@/app/types/types"
import ReservedItem from "./ReservedItem"

type ReservedItem= {
    id: number,
    expires_at: string,
    product_sold: boolean
}

export default function ConflictsPopup({reserved_ids, cart} : {reserved_ids: ReservedItem[], cart: CartItem[]}){

    return(
        <div className="conflicts-box">
            <div className="conflict-head">
                <div className="box-top">
                    <svg height="20px" width="20px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
                        viewBox="0 0 512 512"  xmlSpace="preserve">
                        <g>
                            <path d="M505.095,407.125L300.77,53.208c-9.206-15.944-26.361-25.849-44.774-25.849
                                c-18.412,0-35.552,9.905-44.751,25.849L6.905,407.109c-9.206,15.944-9.206,35.746,0,51.69
                                c9.206,15.944,26.354,25.842,44.758,25.842h408.674c18.405,0,35.568-9.897,44.759-25.842
                                C514.302,442.855,514.302,423.053,505.095,407.125z M256.004,426.437c-17.668,0-32.013-14.33-32.013-32.004
                                c0-17.668,14.345-31.997,32.013-31.997c17.667,0,31.997,14.329,31.997,31.997C288.001,412.108,273.671,426.437,256.004,426.437z
                                M275.72,324.011c0,10.89-8.834,19.709-19.716,19.709c-10.898,0-19.717-8.818-19.717-19.709l-12.296-144.724
                                c0-17.676,14.345-32.005,32.013-32.005c17.667,0,31.997,14.33,31.997,32.005L275.72,324.011z"/>
                        </g>
                    </svg>
                    <p>Another customer has made some items unavailable</p>
                </div>
                <p className="bottom">The following items are currently reserved by another customer for purchase or 10 minutes</p>
            </div>
            <div className="reserved-items">
                {reserved_ids && 
                    reserved_ids.map((row) => {
                        return(
                            <ReservedItem item={row} cart={cart} />
                        )
                    })
                }
            </div>
            <div className="conflicts-footer">
                <svg width="20px" height="20px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    
                    <title>checkmark-circle</title>
                    <desc>Created with Sketch Beta.</desc>
                        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g id="Icon-Set-Filled" transform="translate(-102.000000, -1141.000000)" fill="#34b334">
                                <path d="M124.393,1151.43 C124.393,1151.43 117.335,1163.73 117.213,1163.84 C116.81,1164.22 116.177,1164.2 115.8,1163.8 L111.228,1159.58 C110.85,1159.18 110.871,1158.54 111.274,1158.17 C111.677,1157.79 112.31,1157.81 112.688,1158.21 L116.266,1161.51 L122.661,1150.43 C122.937,1149.96 123.548,1149.79 124.027,1150.07 C124.505,1150.34 124.669,1150.96 124.393,1151.43 L124.393,1151.43 Z M118,1141 C109.164,1141 102,1148.16 102,1157 C102,1165.84 109.164,1173 118,1173 C126.836,1173 134,1165.84 134,1157 C134,1148.16 126.836,1141 118,1141 L118,1141 Z" id="checkmark-circle">
                                </path>
                        </g>
                    </g>
                </svg>
                <p>You have reserved the remaining items in your cart for remainder of checkout or 10 minutes.</p>
            </div>
        </div>
    )
}