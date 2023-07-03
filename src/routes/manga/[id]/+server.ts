import type { RequestHandler } from "./$types";
import axios from 'axios';
import cheerio from 'cheerio';

export const GET: RequestHandler = async ({ url }) => {
  const id = url.pathname;

  // Your logic for handling the page parameter and generating the response
  try {
    const url = `${import.meta.env.VITE_IMAGE_URL}${id}`;

    console.log("Navigating to: ", url);

    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const elements = $('.chapter-name');
const data = elements.map((index, element) => {
  const src = $(element).attr('href');
  const chapterId = src ? src.split('/').slice(-1)[0] : null;

  return {
    src,
    chapterId,
    chapterTitle: $(element).text(),
  };
}).get();

    return new Response(JSON.stringify({
        episodes: data,
    }));
  } catch (error: any) {
    return new Response(JSON.stringify({
        episodes: error.message,
        failure: error
    }));
  }
  
};
