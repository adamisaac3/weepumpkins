import Slider from "rc-slider"
import Range from 'rc-slider'
import 'rc-slider/assets/index.css'
import { ChangeEvent, useState } from "react";
export default function PriceSlider({maxPrice} : {maxPrice: number}){
    const [range, setRange] = useState([0, maxPrice])
    
    const clamp = (val: number, min: number) => Math.max(min, Math.min(val, maxPrice))

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = clamp(Number(e.target.value), 0)

        if(e.target.name === 'min'){
            const clampedMin = Math.max(0, Math.min(Number(e.target.value), range[1]))
            setRange([clampedMin, range[1]])
        }
        else if(e.target.name === 'max'){
            const clampedMax = Math.min(maxPrice, Math.max(Number(e.target.value), range[0]))
            setRange([range[0], clampedMax]);
        }
    };
    
    return(
        <div className="price-range">
            <p style={{paddingBottom: '.7rem'}}>Price Selector</p>
            <Slider 
                range
                min={0}
                max={maxPrice}
                value={range}
                onChange={(newRange) => setRange(newRange as number[])}
                allowCross={false}
                step={1}
            />
            <div className="price-inputs" style={{marginTop: '1rem'}}>
                <input
                    className="min-price"
                    type="number"
                    name="min"
                    max={range[1]}
                    min={0}
                    value={range[0]}
                    onChange={(e) => {
                        setTimeout(() => {
                            handleInputChange(e)
                        }, 30)
                    }}
                />
                <p>-</p>
                <input
                    className="max-price"
                    type="number"
                    name="max"
                    max={maxPrice}
                    min={range[0]}
                    value={range[1]}
                    onChange={(e) => 
                        setTimeout(() => {
                            handleInputChange(e)
                        }, 30)
                    }
                />
            </div>
        </div>
    )
}