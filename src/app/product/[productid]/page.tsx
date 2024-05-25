import { Metadata } from "next";

type Props = {
    params: {
        productid: string;
    }
}


export const metadata = ({ params }: Props): Metadata => {
    return {
        title: `Product ${params?.productid}`,
    };
}


export default function productPage({ params }: Props) {
    return (
        <>
            <div>Product Post: {params.productid}</div>
        </>
    );
}