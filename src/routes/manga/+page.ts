import type { PageLoad } from "./$types";

export const load = (async ({params}) => {

    let mangas = [];
    const url = import.meta.env.VITE_API_URL + '/api/manganelo/browse/1'
console.log("fetching from - ", url)
    const response = await fetch(url);
    const data = await response.json();
    mangas = data.mangas;
    
    return {
        title: "List - Animevariant",
        mangas
    }
    }
) satisfies PageLoad