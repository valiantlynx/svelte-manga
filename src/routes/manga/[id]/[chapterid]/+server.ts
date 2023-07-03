import type { RequestHandler } from "./$types";
import axios from "axios";
import cheerio from "cheerio";

export const GET: RequestHandler = async ({ url }) => {
  // Your logic for handling the page parameter and generating the response
  let path = url.pathname 
  const trimmedPathname = path.substring(path.indexOf("/", 1));

  try {
    const urlLink = `${import.meta.env.VITE_IMAGE_URL}/chapter${trimmedPathname}`;

    console.log("Navigating to: ", urlLink);

    const response = await axios.get(urlLink);
    const $ = cheerio.load(response.data);

    const elements = $('.container-chapter-reader img');

    const data = elements.map((index, element) => {
      const imageUrl = $(element).attr('data-src');
      const pageNumber = index + 1;
      const totalPages = elements.length;

      console.log("Image URL:", imageUrl);
      console.log("Page Number:", pageNumber);
      console.log("Total Pages:", totalPages);

      return {
        imageUrl,
        pageNumber,
        totalPages,
      };
    }).get();
return new Response(JSON.stringify({
        images: data,
    }));
    
  } catch (error: any) {
    return new Response(JSON.stringify({
        images: error.message,
        failure: error
    }));
  }
};
