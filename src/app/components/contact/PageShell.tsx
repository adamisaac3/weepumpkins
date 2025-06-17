'use client'
import Header from "../header/Header";
import Footer from '../footer/Footer'
import Image from "next/image";
import FormInput from "./FormInput";
import { useState } from "react";

export default function ContactPageShell(){
    const [navOpen, setNavOpen] = useState<boolean>(false)
    const [cartOpen, setCartOpen] = useState<boolean>(false);
    const [searchOpen, setSearchOpen] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        const form = e.currentTarget;

        if(!form.checkValidity()){
            return;
        }
        
        const formData = new FormData(form)

        try{
            const response = await fetch(form.action, {
                method: form.method,
                body: formData,
                headers: {
                    Accept: 'application/json'
                }
            })
            
            if(response.ok){
                setError(false);
                setSuccess(true)
                form.reset();
                return;
            }
            setError(true);
        }
        catch{
            setError(true)
        }
    }

    return (
        <>
            <Header searchOpen={searchOpen} setSearchOpen={setSearchOpen} cartOpen={cartOpen} setCartOpen={setCartOpen} navOpen={navOpen} setNavOpen={setNavOpen}/>
            <main className={`${(navOpen || cartOpen || searchOpen) ? 'main-content-blurred' : ''}`}>
                <Image src="/contact-art.png" alt="Get in touch" width={1200} height={825}/> 
                <div className="contact">
                    <div className="socials">
                        <div className="mail">
                            <svg fill="#000000" height="60px" width="60px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
                                viewBox="0 0 508.025 508.025" xmlSpace="preserve">
                                <g>
                                    <g>
                                        <path d="M502.513,187.025l-81.4-62.4v-39.4c0-7.8-6.3-14.1-14.1-14.1h-55.6l-88.8-68.2c-5.1-3.9-12.1-3.9-17.2,0l-88.8,68.2h-55.6
                                            c-7.8,0-14.1,6.3-14.1,14.1v39.4l-81.4,62.4c-3.5,2.7-5.5,6.8-5.5,11.2c0,0.2,0,295.7,0,295.7c0,7.8,6.3,14.1,14.1,14.1h479.8
                                            c7.8,0,14.1-6.3,14.1-14.1c0,0,0-295.2,0-295.7C508.013,193.825,506.013,189.725,502.513,187.025z M421.113,160.225l49.6,38.1
                                            l-49.6,38.1V160.225z M254.012,31.925l51.1,39.2h-102.2L254.012,31.925z M115.112,99.325h277.8v158.7l-138.9,106.6l-138.9-106.6
                                            V99.325z M86.913,160.225v76.1l-49.6-38.1L86.913,160.225z M28.213,226.925l155.3,119.2l-155.3,119.2V226.925z M55.713,479.825
                                            l151-115.9l38.8,29.8c5.1,3.9,12.1,3.9,17.2,0l38.8-29.8l151,115.9H55.713z M479.813,465.325l-155.3-119.2l155.3-119.2V465.325z"
                                            />
                                    </g>
                                </g>
                                <g>
                                    <g>
                                        <path d="M336.513,207.925h-164.9c-7.8,0-14.1,6.3-14.1,14.1s6.3,14.1,14.1,14.1h164.9c7.7,0,14.1-6.3,14.1-14.1
                                            S344.313,207.925,336.513,207.925z"/>
                                    </g>
                                </g>
                                <g>
                                    <g>
                                        <path d="M336.513,141.725h-164.9c-7.8,0-14.1,6.3-14.1,14.1s6.3,14.1,14.1,14.1h164.9c7.8,0,14.1-6.3,14.1-14.1
                                            S344.313,141.725,336.513,141.725z"/>
                                    </g>
                                </g>
                                <g>
                                    <g>
                                        <path d="M297.913,274.125h-87.7c-7.8,0-14.1,6.3-14.1,14.1c0,7.8,6.3,14.1,14.1,14.1h87.7c7.7,0,14.1-6.3,14.1-14.1
                                            S305.713,274.125,297.913,274.125z"/>
                                    </g>
                                </g>
                            </svg>
                            <p>weepumpkins@gmail.com</p>
                        </div>
                        <div className="instagram">
                            <svg fill="#000000" width="75px" height="75px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M20.445 5h-8.891A6.559 6.559 0 0 0 5 11.554v8.891A6.559 6.559 0 0 0 11.554 27h8.891a6.56 6.56 0 0 0 6.554-6.555v-8.891A6.557 6.557 0 0 0 20.445 5zm4.342 15.445a4.343 4.343 0 0 1-4.342 4.342h-8.891a4.341 4.341 0 0 1-4.341-4.342v-8.891a4.34 4.34 0 0 1 4.341-4.341h8.891a4.342 4.342 0 0 1 4.341 4.341l.001 8.891z"/><path d="M16 10.312c-3.138 0-5.688 2.551-5.688 5.688s2.551 5.688 5.688 5.688 5.688-2.551 5.688-5.688-2.55-5.688-5.688-5.688zm0 9.163a3.475 3.475 0 1 1-.001-6.95 3.475 3.475 0 0 1 .001 6.95zM21.7 8.991a1.363 1.363 0 1 1-1.364 1.364c0-.752.51-1.364 1.364-1.364z"/></svg>
                            <p>@weepumpkins</p>
                        </div>
                        <div className="facebook">
                            <svg  width="60px" height="60px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M20 1C21.6569 1 23 2.34315 23 4V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H20ZM20 3C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H15V13.9999H17.0762C17.5066 13.9999 17.8887 13.7245 18.0249 13.3161L18.4679 11.9871C18.6298 11.5014 18.2683 10.9999 17.7564 10.9999H15V8.99992C15 8.49992 15.5 7.99992 16 7.99992H18C18.5523 7.99992 19 7.5522 19 6.99992V6.31393C19 5.99091 18.7937 5.7013 18.4813 5.61887C17.1705 5.27295 16 5.27295 16 5.27295C13.5 5.27295 12 6.99992 12 8.49992V10.9999H10C9.44772 10.9999 9 11.4476 9 11.9999V12.9999C9 13.5522 9.44771 13.9999 10 13.9999H12V21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H20Z" fill="#0F0F0F"/>
                            </svg>
                            <p>Wee Pumpkins</p>
                        </div>
                    </div>

                    <form className="contact-form" onSubmit={(e) => handleSubmit(e)} action="https://formsubmit.co/a3c1ab48ad53363dd32b98c6f65931a8" method="post" >
                        {success && 
                            <div className="success">
                                <p className="success-message">Thank you for contacting me. I will get back to you as soon as possible!!</p>
                            </div>
                        }

                        {error && 
                            <div className="error">
                                <p className="error-message">An error has occured. Please try again.</p>
                            </div>
                        }
                        <div className="top-row">
                            <div className='element'>
                                <label className="label" htmlFor="name">NAME</label>
                                <FormInput name="name" className='name input' type="text" />
                            </div>

                            <div className="element">
                                <label className="label" htmlFor="email">EMAIL</label>
                                <FormInput name={'email'} className='email input' type='email' />
                            </div>
                        </div>
                        <div className="element">
                            <label className='label' htmlFor="message">MESSAGE</label>
                            <textarea name="message" className="message"></textarea>
                        </div>

                        <button className="submit" type="submit">SEND</button>
                    </form>
                </div>

            </main>
            <Footer navOpen={navOpen}/>
        </>
    )
}