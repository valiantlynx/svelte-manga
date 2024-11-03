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
    console.error('Failed to load genre list:', err);
    throw error(500, 'Failed to load genre list');
  }
};

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
