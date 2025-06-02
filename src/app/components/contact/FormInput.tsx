import { useState } from "react";

export default function FormInput({name, className, type} : {name: string, className: string, type: string}){
    const [showError, setShowError] = useState<boolean>(false)

    return(
        <input 
            style={{border: showError ? '1.5px solid red' : '1px solid grey'}}
            className={className}
            name={name}
            type={type} 
            required
            onChange={() => setShowError(false)} 
            onInvalid={(e) => {
                e.preventDefault();
                setShowError(true);
                }}
            >

            </input>
    )

}