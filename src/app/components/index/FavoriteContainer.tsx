export default function FavoriteContainer({itemName, imageLink} : {itemName: string, imageLink: string}){
    const url = itemName.replace(' ', '-').toLowerCase();
    
    return (
        <>
            <div className="favorite-div">
                <a href={`/collections/${url}`} className="favorite-anchor">
                    <img src={imageLink} width={250} height={250} className="favorite-image"/>
                    <span className="favorite-item">{itemName}</span>
                </a>
            </div>
        </>
    )
}