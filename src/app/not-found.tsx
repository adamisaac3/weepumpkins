import AnimatedBorderBox from "./components/multi-use/AnimatedBorder"
export default function NotFound(){
    return(
        <div className="not-found">
                <AnimatedBorderBox />
                <p className="message">This page could not be found.</p>
        </div>
    )
}