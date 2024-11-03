import { error } from '@sveltejs/kit';
let {VITE_PUBLIC_API} = import.meta.env

export const load = async ({ params, fetch }) => {
  const { id, episodeid } = params;

  console.log(id)

  try {
    const episodeData = await getEpisode(fetch, id, episodeid);
    const details = await getDetails(fetch, id);

    if (!episodeData || !details) {
      throw error(404, 'Episode or Anime not found');
    }


    return {
      episodeData,
      details
    };
  } catch (err) {
    console.error('Failed to load episode details:', err);
    throw error(500, 'Failed to load episode details');
  }
};

// Fetch episode data for a specific id and episodeid
async function getEpisode(fetch, id, episodeid) {
	// Extract the episode number from "episode-<number>"
	const episodeNumber = episodeid.split('-').pop(); // This extracts "1" from "episode-1"
	
	// Construct the correct URL
	const url = `${VITE_PUBLIC_API}/api/watching/${id}/${episodeNumber}`;
	console.log(`Fetching episode from URL: ${url}`);
  
	try {
	  const response = await fetch(url, {
		headers: { 'Access-Control-Allow-Origin': '*' }
	  });
	  if (!response.ok) {
		throw new Error(`Failed to fetch episode data for episode ${episodeNumber}`);
	  }
	  return await response.json();
	} catch (err) {
	  console.error(err);
	  throw error(500, 'Failed to fetch episode data');
	}
  }
  

// Fetch anime details for a specific anime ID
async function getDetails(fetch, id) {
  const url = `${VITE_PUBLIC_API}/api/anime/${id}`;
  try {
    const response = await fetch(url, {
      headers: { 'Access-Control-Allow-Origin': '*' }
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch details for anime ${id}`);
    }
    return await response.json();
  } catch (err) {
    console.error(err);
    throw error(500, 'Failed to fetch anime details');
  }
}