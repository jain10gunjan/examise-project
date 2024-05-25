'use client'
import { useRouter } from "next/navigation";

export default function OrderProduct() {

    //Using UseRouter From NextNavigation
    const router = useRouter()

  //Creating HandleClick
  const handleClick = () => {
    console.log("Placing Your Order");
    router.push("/");
  };
  return (
    <>
      <h1>Order Product</h1>
      <button onClick={handleClick}>Place Order</button>
    </>
  );
}
