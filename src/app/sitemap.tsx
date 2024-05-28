import { MetadataRoute } from 'next'
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap[]> {
    interface ApiResponse {
        data: {
            data: []; // Adjusted to match the actual structure
        };
        total: number;
    }

    try {
        const res = await fetch(`https://us-east-1.aws.data.mongodb-api.com/app/aptitude_tracker_api-fjroz/endpoint/sitemap`);
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const data: ApiResponse | any = await res.json();

        var result =  data.data.map((id: string) => ({
            url: `https://app.examise.in/question/${id}`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'yearly',
            priority: 1,
        }));

    } catch (error: any) {
        console.error(error.message);
    }

    return result;
}