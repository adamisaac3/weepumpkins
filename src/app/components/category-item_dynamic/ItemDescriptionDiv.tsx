'use client'
import DisclaimerButton from './DisclaimerButton'
import CartButton from './CartButton'
import {AddItemHandler} from './AddItemToCart'
import { CartItem } from '@/app/types/types'
function hasDecimal(num: number){
    return num % 1 !== 0
}

export default function Component({item, thumbnail} : {thumbnail: string, item: {productid: number, productname: string, categoryname: string, subcategoryname: string, categoryid: number, subcategoryid: number, description: string, price: number, dimensions: string}}){

    const cart_item: CartItem = {
        product_name: item.productname,
        product_id: item.productid,
        price: item.price,
        quantity: 1,
        category_name: item.categoryname,
        image_path: thumbnail,
        category_id: item.categoryid
    }

    return (
        <div className="item-details-div">
            <div className="item-detail-header">
                <div className="item-name-info">
                    <h1 className="product-name">{item.productname}</h1>
                    <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5Z" fill="#000000" />
                    </svg>
                    <h1 className="product-id">{item.productid}</h1>
                </div>
                <div className="item-category-info">
                    <h2 className="item-category">{item.categoryname}</h2>
                    {item.subcategoryname && 
                        <>
                            <svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5Z" fill="#000000" />
                            </svg>
                            <h2 className="item-subcategory">{item.subcategoryname}</h2>
                        </>
                    }
                </div>
                <p className="item-price">$ {hasDecimal(item.price) ? item.price : item.price.toFixed(2)}</p>
            </div>

            <div className="payment-div">
                <div className="size-and-shipping">
                    <div className="size">

                        <svg width="26px" height="26px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.96173 18.9109L9.42605 18.3219L8.96173 18.9109ZM12 5.50063L11.4596 6.02073C11.601 6.16763 11.7961 6.25063 12 6.25063C12.2039 6.25063 12.399 6.16763 12.5404 6.02073L12 5.50063ZM15.0383 18.9109L15.5026 19.4999L15.0383 18.9109ZM9.42605 18.3219C7.91039 17.1271 6.25307 15.9603 4.93829 14.4798C3.64922 13.0282 2.75 11.3345 2.75 9.1371H1.25C1.25 11.8026 2.3605 13.8361 3.81672 15.4758C5.24723 17.0866 7.07077 18.3752 8.49742 19.4999L9.42605 18.3219ZM2.75 9.1371C2.75 6.98623 3.96537 5.18252 5.62436 4.42419C7.23607 3.68748 9.40166 3.88258 11.4596 6.02073L12.5404 4.98053C10.0985 2.44352 7.26409 2.02539 5.00076 3.05996C2.78471 4.07292 1.25 6.42503 1.25 9.1371H2.75ZM8.49742 19.4999C9.00965 19.9037 9.55954 20.3343 10.1168 20.6599C10.6739 20.9854 11.3096 21.25 12 21.25V19.75C11.6904 19.75 11.3261 19.6293 10.8736 19.3648C10.4213 19.1005 9.95208 18.7366 9.42605 18.3219L8.49742 19.4999ZM15.5026 19.4999C16.9292 18.3752 18.7528 17.0866 20.1833 15.4758C21.6395 13.8361 22.75 11.8026 22.75 9.1371H21.25C21.25 11.3345 20.3508 13.0282 19.0617 14.4798C17.7469 15.9603 16.0896 17.1271 14.574 18.3219L15.5026 19.4999ZM22.75 9.1371C22.75 6.42503 21.2153 4.07292 18.9992 3.05996C16.7359 2.02539 13.9015 2.44352 11.4596 4.98053L12.5404 6.02073C14.5983 3.88258 16.7639 3.68748 18.3756 4.42419C20.0346 5.18252 21.25 6.98623 21.25 9.1371H22.75ZM14.574 18.3219C14.0479 18.7366 13.5787 19.1005 13.1264 19.3648C12.6739 19.6293 12.3096 19.75 12 19.75V21.25C12.6904 21.25 13.3261 20.9854 13.8832 20.6599C14.4405 20.3343 14.9903 19.9037 15.5026 19.4999L14.574 18.3219Z" fill="#1C274C" />
                        </svg>

                        <p>All Product Sizes May Vary!!</p>

                    </div>
                    <div className="shipping">
                        <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M16.5 6H3V17.25H3.375H4.5H4.52658C4.70854 18.5221 5.80257 19.5 7.125 19.5C8.44743 19.5 9.54146 18.5221 9.72342 17.25H15.0266C15.2085 18.5221 16.3026 19.5 17.625 19.5C18.9474 19.5 20.0415 18.5221 20.2234 17.25H21.75V12.4393L18.3107 9H16.5V6ZM16.5 10.5V14.5026C16.841 14.3406 17.2224 14.25 17.625 14.25C18.6721 14.25 19.5761 14.8631 19.9974 15.75H20.25V13.0607L17.6893 10.5H16.5ZM15 15.75V9V7.5H4.5V15.75H4.75261C5.17391 14.8631 6.07785 14.25 7.125 14.25C8.17215 14.25 9.07609 14.8631 9.49739 15.75H15ZM17.625 18C17.0037 18 16.5 17.4963 16.5 16.875C16.5 16.2537 17.0037 15.75 17.625 15.75C18.2463 15.75 18.75 16.2537 18.75 16.875C18.75 17.4963 18.2463 18 17.625 18ZM8.25 16.875C8.25 17.4963 7.74632 18 7.125 18C6.50368 18 6 17.4963 6 16.875C6 16.2537 6.50368 15.75 7.125 15.75C7.74632 15.75 8.25 16.2537 8.25 16.875Z" fill="#080341" />
                        </svg>

                        <p>FREE SHIPPING!!</p>
                    </div>
                </div>
                <div className="payment-buttons">
                    <CartButton product={cart_item} />

                    <button className="venmo-button">Buy With
                        <svg fill="#FFFFFF" width="68px" height="68px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.255 12.959c0.224 0.359 0.319 0.724 0.319 1.187 0 1.48-1.267 3.401-2.292 4.761h-2.333l-0.948-5.625 2.052-0.203 0.495 4c0.469-0.745 1.041-1.933 1.041-2.745 0-0.437-0.083-0.745-0.203-1zM7.921 15.427c0.371 0 1.333-0.172 1.333-0.708 0-0.265-0.187-0.401-0.4-0.401-0.385 0-0.881 0.469-0.933 1.109zM7.88 16.495c0 0.667 0.36 0.932 0.855 0.932 0.531 0 1.025-0.135 1.692-0.468l-0.255 1.681c-0.464 0.224-1.188 0.376-1.891 0.376-1.776 0-2.417-1.068-2.417-2.428 0-1.749 1.043-3.604 3.177-3.604 1.172 0 1.839 0.656 1.839 1.579 0 1.464-1.907 1.932-3 1.943zM16.803 14.265c0 0.229-0.043 0.537-0.068 0.751l-0.615 3.891h-2l0.563-3.573 0.036-0.401c0-0.265-0.156-0.317-0.344-0.317-0.271 0-0.536 0.12-0.692 0.197l-0.641 4.095h-2l0.907-5.828h1.735l0.025 0.468c0.412-0.265 0.959-0.573 1.719-0.573 1.011 0 1.376 0.532 1.376 1.308zM22.735 13.615c0.572-0.401 1.104-0.641 1.864-0.641 1.016 0 1.375 0.532 1.375 1.308-0.004 0.245-0.025 0.489-0.067 0.735l-0.615 3.891h-2l0.572-3.641 0.032-0.292c0-0.291-0.161-0.359-0.365-0.359-0.239 0-0.489 0.104-0.667 0.197l-0.635 4.095h-2l0.573-3.652 0.025-0.281c0-0.291-0.161-0.359-0.359-0.359-0.272 0-0.521 0.12-0.699 0.197l-0.625 4.084h-2.009l0.916-5.817h1.708l0.068 0.484c0.401-0.297 0.932-0.589 1.651-0.589 0.641 0 1.043 0.267 1.256 0.641zM29.948 15.307c0-0.468-0.12-0.801-0.469-0.801-0.796 0-0.957 1.401-0.957 2.109 0 0.547 0.145 0.88 0.505 0.88 0.744 0 0.921-1.468 0.921-2.188zM26.479 16.531c0-1.837 0.991-3.557 3.215-3.557 1.692 0 2.307 1 2.307 2.376 0 1.812-0.959 3.692-3.255 3.692-1.693 0-2.267-1.109-2.267-2.511z" />
                        </svg>
                        <svg fill="#FFFFFF" width="32px" height="32px" viewBox="0 0 512 512" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"><path d="M444.17,32H70.28C49.85,32,32,46.7,32,66.89V441.6C32,461.91,49.85,480,70.28,480H444.06C464.6,480,480,461.8,480,441.61V66.89C480.12,46.7,464.6,32,444.17,32ZM278,387H174.32L132.75,138.44l90.75-8.62,22,176.87c20.53-33.45,45.88-86,45.88-121.87,0-19.62-3.36-33-8.61-44L365.4,124.1c9.56,15.78,13.86,32,13.86,52.57C379.25,242.17,323.34,327.26,278,387Z" /></svg>
                    </button>

                    <a href="#" className="payment-options">More Payment Options</a>
                </div>
            </div>
            <div className="item-description">
                <p>{item.description}</p>

                <p>Item Dimensions: {item.dimensions}</p>
                <p>Disclosure: The vintage styles have lived a full life before becoming the designs in the shop.</p>
                <p>Colors in pictures are edited to enhance lighting.</p>
                <p>All items are made from well loved quilts which may contain slight stains, discolorations and thinning fabric.</p>
                <p>Imperfections should be celebrated.</p>
            </div>

            <div className="disclaimers-policies">
                <DisclaimerButton rowNum="one" outerContent={'PRODUCT DISCLAIMER'} innerContent={'The vintage styles have lived a full life before becoming the designs in the shop. Colors in pictures are edited to enhance lighting. All items are made from well loved quilts which may contain slight stains, discolorations and thinning fabric. Imperfections should be celebrated.'} />
                <DisclaimerButton rowNum="two" outerContent={'ITEM DIMENSIONS'} innerContent={`Item dimensions vary per product. If you are unsure about product dimensions, feel free to reach out at 'weepumpkins@gmail.com' for better clarification. ${item.dimensions ? 'Item Dimensions: ' + item.dimensions : ''}`} />
                <DisclaimerButton rowNum="three" outerContent={'RETURN POLICY'} innerContent={'Our one of a kind products with free shipping sets us apart, and therefore makes it harder to offer a return policy. Special circumstances permit and please reach out to "weepumpkins@gmail.com" if you believe you qualify for a return. Shipping expenses will not be covered'} />
                <DisclaimerButton rowNum="four" outerContent={'SHIPPING INFORMATION'} innerContent={'Shipping is free for locations within the United States!! International shipping prices may vary and calculated shipping is based on the weight of the package. Which means you pay what it costs us to ship. Woohoo!'} />
            </div>
        </div>
    )
}