import { timelineData } from "./constants"

export const Timeline = () => {
    return (
        <>
            <section className="relative pt-28 pb-24 bg-white overflow-hidden">
                <img className="absolute left-1/2 top-0 transform -translate-x-1/2" src="https://shuffle.dev/flaro-assets/images/how-it-works/gradient2.svg" alt="" />
                <div className="relative z-10 container px-4 mx-auto">
                    <p className="mb-6 text-sm text-indigo-600 text-center font-semibold uppercase tracking-px">Here is the Timeline</p>
                    <h2 className="mb-20 text-6xl md:text-7xl text-center font-bold font-heading tracking-px-n leading-tight">Timeline</h2>
                    <div className="flex flex-wrap -m-8">
                        {timelineData.map((data, index) => (
                            <div key={index} className="w-full md:w-1/2 lg:w-1/4 p-8">
                                <div className="text-center">
                                    <div className="relative z-10 bg-purple-700 w-12 h-12 mb-8 mx-auto border border-blueGray-200 rounded-full">
                                        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                            <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d={data.svgpathd} fill="white"></path>
                                            </svg>
                                        </div>

                                        <div className="hidden lg:block absolute left-12 top-1/2 transform -translate-y-1/2 w-96 h-px bg-gray-200"></div>
                                    </div>
                                    <div className="md:max-w-xs mx-auto">
                                        <h3 className="mb-4 font-heading text-xl font-bold font-heading leading-normal">{data.year}</h3>
                                        <p className="text-gray-600 font-medium leading-relaxed">{data.data}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}