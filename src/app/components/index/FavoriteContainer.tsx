import Image from "next/image";
export default function FavoriteContainer({itemName, imageLink} : {itemName: string, imageLink: string}){
    const url = itemName.replace(' ', '-').toLowerCase();
    
    return (
        <>
            <div className="favorite-div">
                <a href={`/collections/${url}`} className="favorite-anchor">
                    <Image src={imageLink} width={250} height={250} className="favorite-image" alt="Image of favorite collections"/>
                    <span className="favorite-item">{itemName}</span>
                </a>
            </div>
        </>
    )
}