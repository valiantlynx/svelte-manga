import type { PageLoad } from "./$types";
import axios, { Axios } from "axios";

export const load = (async ({params}) => {

    const page = 1
    let mangas = [];
    
    const url = import.meta.env.VITE_HOST_URL + `/manga?page=${page}`;

    const response = await axios.get(url, {
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    });

    const data = await response.data
    mangas = data.mangas;
    
    return {
        title: "List - Animevariant",
        mangas
    }
    }
) satisfies PageLoad