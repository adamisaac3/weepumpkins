import {motion} from 'framer-motion'

export default function Spinner(){
    return (
        <motion.div 
            animate={{rotate: 360}}
            transition={{repeat: Infinity, duration: .7, ease: 'linear'}}
            style={{
                width:20,
                height: 20,
                border: '4px solid rgba(0,0,0,0.2)',
                borderTop: '4px solid #000',
                borderRadius: '50%',
            }}
            className="animated-spinner"
        >

        </motion.div>
    )
}