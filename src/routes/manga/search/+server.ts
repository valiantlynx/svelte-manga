import type { RequestHandler } from "./$types";
import axios from "axios";
import cheerio from "cheerio";

export const GET: RequestHandler = async ({ url }) => {
let results: any = [];
var word = url.searchParams.get("word");
const page: any = url.searchParams.get("page");

console.log("Fetching from -", url);
// Your logic for handling the page parameter and generating the response
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
};

if (isNaN(page)) {
    return new Response(JSON.stringify({ results }), { headers })
}


let urlApi = `${import.meta.env.VITE_IMAGE_URL}/search/${word}?page=${page}`;
console.log("url: ", url);
console.log("searching for: ", word, " on page: ", page );
console.log("fetching from - ", urlApi);

try {
    const { data: html } = await axios.get(urlApi);

    const $ = cheerio.load(html);

    const scrapedData: any = [];

    $('.search-story-item').each((index, element) => {
        const titleElement = $(element).find('.item-title');
        const imgElement = $(element).find('img');
        const chaptersElement = $(element).find('.item-title');
        const srcElement = $(element).find('a');
        const authorElement = $(element).find('.item-author');

        // Extract the ID and title ID from the src URL
        const src = srcElement.attr('href');
        const id = src ? src.split('/').slice(-1)[0] : null;
        const titleId = titleElement.text()
  
        const content = {
            title: titleElement.text().trim(),
            img: `${import.meta.env.VITE_IMAGE_URL}` + imgElement.attr('src'),
            latestChapter: chaptersElement.text(),
            src: `${import.meta.env.VITE_HOST_URL}` + src,
            mangaParkId: id,
            titleId,
            author: authorElement.length
                ? [authorElement.text(), authorElement.find('a').attr('href')]
                : null,
        };

        scrapedData.push(content);
    });
    
    return new Response(JSON.stringify({
        page: page,
        mangas: scrapedData,
    }), { headers });

} catch (error:any) {
    return new Response(JSON.stringify({
        error: error.message,
        failure: error
    }), { headers });
  }

};







