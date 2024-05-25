import Link from "next/link"
import { advisorComponentData } from "./constants"
import Image from "next/image"

export const Advisors = () => {
    return (
        <>
            <section className="py-24 bg-blueGray-50 overflow-hidden">
                <div className="container px-4 mx-auto">
                    <h2 className="mb-5 text-6xl md:text-8xl xl:text-10xl text-center font-bold font-heading font-heading tracking-px-n leading-none"><span className="w-full text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 lg:inline">Our Advisors</span></h2>
                    <p className="mb-16 text-lg text-gray-600 text-center font-bold leading-normal md:max-w-lg mx-auto">Lorem ipsum dolor sit amet, to the con adipiscing. Volutpat tempor to the condimentum vitae vel purus.</p>
                    <div className="md:max-w-6xl mx-auto">
                        <div className="flex flex-wrap -m-3.5 mb-10">
                            {advisorComponentData.map((data,index)=>(
                                <div key={index} className="w-full md:w-1/3 p-3.5">
                                <Link href="#">
                                    <div className="relative p-4 h-full bg-gradient-to-r from-purple-200 to-purple-600 text-white border hover:border-gray-300 rounded-xl">
                                        <div className="relative z-10 flex flex-col justify-between h-full">
                                            <div className="flex flex-row">
                                                <div className="flex">
                                                    <Image src={data.imageurl} alt="profile-images" height={64} width={64} className="h-16 w-16 object-cover rounded-full"/>
                                                </div>
                                                <div className="mx-auto my-auto">
                                                    <h3 className="text-lg text-white font-extrabold font-heading leading-snug">{data.advisorName}</h3>
                                                    <p className="text-sm text-white font-medium">
                                                        <span>{data.advisorDesignation}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}