'use client'
import {useState, JSX} from 'react'

export default function Footer(){

    const [product, setProduct] = useState(false);
    const [returns, setReturns] = useState(false);
    const [shipping, setShipping] = useState(false);
    const [faq, setFaq] = useState(false);
    
    const handleProduct = () => {
        setProduct(!product)
    };
    const handleReturns = () => setReturns(!returns);
    const handleShipping = () => setShipping(!shipping);
    const handleFaq = () => setFaq(!faq);


    return (
        <footer className="main-footer">
            <h2>Products and Procedures</h2>
            <div className="footer-div">
                <div className="footer-policy">
                    <p>All Product Disclaimers</p>
                    <button className="policy-button" onClick={handleProduct}>
                        <svg className={`policy-button-icon ${product ? 'clicked' : ''}`}  width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 10L12 15L17 10" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
                {product && 
                        <div className="footer-policy-info">
                            <p>****PLEASE DOUBLE CHECK DIMENSIONS BEFORE PURCHASING!!!***</p>
                            <p>All items are made from well loved quilts which may contain slight stains, discolorations and thinning fabric.</p>
                            <p>Colors in pictures are edited to enhance lighting.</p>
                        </div>
                }
                <div className="footer-policy">
                    <p>Returns, Exchanges, Cancellations</p>
                    <button className="policy-button" onClick={handleReturns}>
                        <svg className={`policy-button-icon ${returns ? 'clicked' : ''}`}  width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 10L12 15L17 10" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
                <div className="footer-policy">
                    <p>Shipping Terms</p>
                    <button className="policy-button" onClick={handleShipping}>
                        <svg className={`policy-button-icon ${shipping ? 'clicked' : ''}`} width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 10L12 15L17 10" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
                {shipping &&
                    <div className="footer-policy-info">
                        <p>FREE SHIPPING!!</p>
                    </div>
                }
                <div className="footer-policy">
                    <p>Frequently Asked Questions</p>
                    <button className="policy-button" onClick={handleFaq}>
                        <svg className={`policy-button-icon ${faq ? 'clicked' : ''}`}  width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 10L12 15L17 10" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>

                <a href="/contact" className="footer-contact">Contact Me</a>
            </div>
        </footer>
    )
}