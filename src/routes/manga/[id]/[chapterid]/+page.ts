import type { PageLoad } from "./$types";


export const load = (async ({params}) => {
    const { id, chapterid } = params

    let images = [];

    const response = await fetch(import.meta.env.VITE_API_URL + `/api/manganelo/${id}/${chapterid}`);
    const data = await response.json();
    images = data.images;
    
    return {
        title: "Chapter page - Animevariant",
        images
    }
    }
) satisfies PageLoad