import {motion} from 'framer-motion'
import {useState} from 'react'
export default function Component({label, value, onChange}: {label: string, value: string, onChange: () => void}){
    
    const [focused, setIsFocused] = useState(false)
    
    const showLabel = focused || value.length > 0

    return(
        <div 
            className="animated-input-div"
            style={{position: 'relative'}}
        >
            <input 
                value={value}
                onChange={onChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="animated-input"
            />

            <motion.label 
                initial={false}
                animate={{top: showLabel ? "0.2rem" : "1rem", left: '1rem', fontSize: showLabel ? ".75rem" : "1rem", color: showLabel ? "#3b82f6" : "#9ca3af"}}
                transition={{ duration: 0.25 }}
                style={{position: 'absolute', pointerEvents: 'none'}}

            >
            {label}
            </motion.label>
        </div>
    )
}