import JobFilterSidebar from "@/components/JobFilterSidebar";
import JobResult from "@/components/JobResults";
import { JobFilterValues } from "@/lib/validation";

interface PageProps {
    searchParams: {
        experience?: string,
        work?: string,
        type?: string,
        location?: string,
    }
}



export default function Jobs({ searchParams: { work, experience, type, location } }: PageProps) {
    const filterValues: JobFilterValues = {
        work,
        experience,
        type,
        location,
    }

    
    return (
        <div className="max-w-5xl m-auto px-3 my-10 space-y-10">
            <div className="relative z-10 container px-4 mx-auto">
                <p className="mb-6 text-sm text-indigo-600 font-bold uppercase tracking-px">Examise</p>
                <h2 className="mb-5 text-6xl md:text-7xl font-bold font-heading tracking-px-n leading-tight">Find Jobs For Free</h2>
                <p className="mb-20 text-gray-600 font-medium leading-relaxed md:max-w-md">Find Your Dream Job Today: Unlock Endless Possibilities and Achieve Your Career Goals</p>
            </div>
            <section className="flex flex-col md:flex-row gap-4">
                <JobFilterSidebar />
                <JobResult filterValues={filterValues} />
            </section>
        </div>
    );
}
