import type { PageLoad } from "./$types";


export const load = (async ({params}) => {
    const { id } = params;

    let chapters = [];

    const response = await fetch(import.meta.env.VITE_API_URL + `/api/manganelo/${id}`);
    const data = await response.json();
    chapters = data.episodes;
    
    return {
        title: "manga page- Animevariant",
        chapters
    }
    }
) satisfies PageLoad