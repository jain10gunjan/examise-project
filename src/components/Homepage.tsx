"use client"
import { useEffect, useState } from 'react';

interface Question {
    _id: string;
    topic: string;
    difficulty: string;
    question: string;
    options: string;
    correcr_option: string;
    solution: string;
}





const Homepage = () => {

    const [data, setData] = useState<Question[] | null>(null);
    const [text, setText] = useState<string>('');
    const [textflag, setTextflag] = useState<boolean | null>(false);


    const setTextForSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    }

    const searchQuestion = () => {
        console.log('Working For SearchQuestion')
        if (textflag === false) {
            setTextflag(true);
        }
    }

    useEffect(() => {
        async function fetchData() {
            console.log('working useEffect');
            try {
                const res = await fetch(`https://us-east-1.aws.data.mongodb-api.com/app/aptitude_tracker_api-fjroz/endpoint/aptitudeData?question=${text}`);
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: Question[] = await res.json();
                setData(data);
                setTextflag(false);
            } catch (error: any) {
                Error(error.message);
            }
        }

        fetchData();
    }, [textflag]);
    { console.log(data) }


    return (
        <>
            <section className="h-auto bg-white tails-selected-element">
                <div className="px-10 py-2 mx-auto max-w-7xl">
                    <div className="w-full">
                        <h1 className="mb-6 text-5xl font-extrabold leading-none max-w-5xl mx-auto tracking-normal text-gray-900 sm:text-6xl md:text-6xl lg:text-7xl md:tracking-tight"><span className="w-full text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 lg:inline">Examise</span>.in</h1>
                        <p className="px-0 mb-6 text-lg text-gray-600 md:text-xl lg:px-24"> Your One Stop For All MCQs Needs.</p>

                        <form className="flex justify-center" action={searchQuestion}>
                            <label htmlFor="simple-search" className="sr-only">Search</label>
                            <div className="relative">
                                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                                </div>
                                <input onChange={setTextForSearch} value={text} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
                            </div>
                            <button type="submit" className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></button>
                        </form>
                    </div>

                </div>

                <div className="relative flex flex-col jus items-center justify-center overflow-hidden p-6 sm:py-12">





                    {data?.map((data, index) => (
                        <div className="w-full max-w-4xl flex flex-col sm:flex-row gap-3 sm:items-center hover:bg-purple-100 hover:cursor-pointer justify-between px-5 py-4 rounded-md">
                            <div>

                                <span className="text-purple-800 text-sm" dangerouslySetInnerHTML={{ __html: data.topic }}></span>
                                <h3 className="font-bold mt-px" dangerouslySetInnerHTML={{ __html: data.question }}></h3>
                                <div className="flex items-center gap-3 mt-2">
                                    <span className="bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-sm">Practice</span>
                                    <span className="bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-sm">Share</span>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </section>

        </>
    );
};

export default Homepage;
