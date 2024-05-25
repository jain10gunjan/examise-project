import { notFound } from "next/navigation";

export default function reviewDetail({params}:{
    params:{
        reviewid:string;
    }
}){
    if(parseInt(params.reviewid) > 1000){
        notFound();
    }
    return (
        <>
        <div>Review : {params.reviewid}</div>
        </>
    )
}