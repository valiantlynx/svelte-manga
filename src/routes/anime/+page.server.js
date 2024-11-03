import { error } from '@sveltejs/kit';
let {VITE_PUBLIC_API} = import.meta.env

export const load = async ({ url, fetch }) => {
  const pageNo = parseInt(url.searchParams.get('page') || '1');
  try {
    const popularAnimeList = await getPopularAnime(fetch, pageNo);
    return {
      pageNo,
      popularAnimeList
    };
  } catch (err) {
    console.error('Failed to load popular anime list:', err);
    throw error(500, 'Failed to load popular anime list');
  }
};

/** @type {import('./$types').Actions} */
export const actions = {
  popular: async ({ request, fetch }) => {
	
    const data = await request.formData();
    const pageNo = parseInt(data.get('page') || '1');
    try {
      const popularAnimeList = await getPopularAnime(fetch, pageNo);
	  console.log("-------------->")
      return { popularAnimeList, pageNo };
    } catch (err) {
      console.error('Failed to load anime list:', err);
      throw error(500, 'Failed to load anime list');
    }
  }
};

// Function to fetch anime data for a specific page
async function getPopularAnime(fetch, pageNo) {
  const url = `${VITE_PUBLIC_API}/api/popular/${pageNo}`;
  try {
    const response = await fetch(url, {
      headers: { 'Access-Control-Allow-Origin': '*' }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch popular anime');
    }
    const results = await response.json();
    return results.results;
  } catch (error) {
    console.error(error);
    throw error(500, 'Failed to fetch popular anime');
  }
}
