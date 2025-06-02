import {AnimatePresence, motion} from 'framer-motion'
import {useEffect, useState} from 'react'

type Props = {
    label: string, 
    name: string, 
    isRequired: boolean,
    defaultValue: string
}

export default function Component({label,  name, isRequired, defaultValue}: Props){
    
    const [focused, setIsFocused] = useState(false)
    const [hasBeenFocused, setHasBeenFocused] = useState(false)
    const [value, setValue] = useState(defaultValue ? defaultValue : '');
    const showLabel = focused || value.length > 0
    const isEmpty = value.trim() === ''
    const [showError, setShowError] = useState(isEmpty && !focused && isRequired && hasBeenFocused);

    useEffect(() => {
        setValue(defaultValue ?? '')
    }, [defaultValue])

    return(
        <div 
            style={{position: 'relative'}}
            className="animated-input-div"
        >
            
            <motion.label
                style={{
                    position: 'absolute',
                    left: '10px',
                    top: '15px',
                    color: showError ? 'red' : `#888`,
                    pointerEvents: 'none',
                    transformOrigin: 'top left'
                }}
                initial={false}
                animate={{
                    y: showLabel ? -12: 0,
                    scale: showLabel ? 0.8: 1,
                    opacity: showLabel ? 0.8 : 1
                }}
                transition={{type: 'spring', stiffness: 300, damping: 20}}
            >
                {label}
            </motion.label>

            <motion.input
                name={name}
                style={{
                    width: '100%',
                    padding: '20px 12px 8px 12px',
                    fontSize: '16px',
                    border: `1px solid ${showError ? 'red' : '#ccc'}`,
                    borderRadius: "4px",
                    outline: showError ? '1.5px solid red' : 'none',
                }}
                onFocus={() => {
                    setIsFocused(true)
                    setHasBeenFocused(true)
                }}
                onBlur={() => setIsFocused(false)}
                onChange={(e) => {
                    setValue(e.target.value)
                    setShowError(false);
                }}
                className="animated-input"
                required={isRequired}
                onInvalid={(e) => {
                    e.preventDefault()
                    setShowError(true)
                }}
                value={value}
            />   
            <AnimatePresence>
                {showError && 
                    <span>
                        <p key="error" style={{color: 'red', paddingTop: '10px'}}>Enter {label.toLowerCase()}</p>
                    </span>
                }
            </AnimatePresence>
        </div>
        
    )
}