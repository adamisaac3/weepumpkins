
export async function generateStaticParams(){
    const response = await fetch('/api/items');
    const {items, images} = await response.json();


    const data = items.map((i: any) => {
        const sanitizedProductName = (i.product_name as string).replace(/[:\/_<>\s]/g, '-').toLowerCase();
        const urlCategory = (i.category_name as string).replace(' ', '-').toLowerCase();
        
        return {category: urlCategory, product: sanitizedProductName}
    })


    return {
        paths: data.map((i: any) => ({
            params: {category: i.category, item: i.product}
        })),
    }
}

export default function Page(){

}