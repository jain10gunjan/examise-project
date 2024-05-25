import Link from "next/link"

export const Thirdlast = () => {
    return (
        <>
            <section className="relative py-20 lg:py-32 overflow-hidden">
                <div className="relative container px-4 mx-auto">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex flex-wrap -mx-4">
                            <div className="w-full lg:w-1/2 px-4 mb-14 lg:mb-0">
                                <div className="mt-12 max-w-md lg:max-w-lg mx-auto lg:mx-0">
                                    <h1 className="font-heading text-5xl xs:text-6xl font-bold text-gray-900 mb-6">
                                        <span>Lorem, ipsum dolor.</span>
                                        <span>Lorem ipsum dolor sit amet.</span>
                                    </h1>
                                    <div className="max-w-sm mb-10">
                                        <p className="text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos deleniti veniam inventore.</p>
                                    </div>
                                    <div className="inline-block sm:inline-flex items-center">
                                        <div className="flex mb-6 sm:mb-0 mr-6 items-center">
                                            {/* buttons is here */}
                                            <Link className="relative group inline-block w-full sm:w-auto py-4 px-6 text-white font-semibold bg-purple-500 rounded-md overflow-hidden" href="#">
                                                <div className="absolute top-0 right-full w-full h-full bg-purple-900 transform group-hover:translate-x-full group-hover:scale-102 transition duration-500"></div>
                                                <div className="relative flex items-center justify-center">
                                                    <span className="mr-4">Lorem, ipsum dolor.</span>
                                                    <span>
                                                        {/* Here we can include svg */}
                                                    </span>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full lg:w-1/2 px-4">
                                <div className="relative max-w-md lg:max-w-sm mx-auto lg:mr-0">
                                    <img className="mx-auto rounded-xl" src="https://dummyimage.com/400x500" alt="alt-text" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}