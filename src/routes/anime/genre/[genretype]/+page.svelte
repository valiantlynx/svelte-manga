<script>
  import {Breadcrumbs} from '@valiantlynx/svelte-ui';
  import { page } from '$app/stores';

  let genretype = $page.params.genretype;
  let pageNO = 1;
  let animeList = [];

  const crumbs = [
		{
			name: 'Home',
			url: '/'
		},
    {
			name: 'Anime',
			url: '/anime'
		},
		{
			name: 'Genre List',
			url: '/anime/genre-list'
		},
		{
			name: `${genretype}`,
			url: `/anime/genre/${genretype}`
		}
	];


  async function fetchAnimeList() {
    animeList = await getGenre(genretype, pageNO);
  }

</script>

<div class="container mx-auto px-4">
  <Breadcrumbs {crumbs} />
  <h1 class="text-3xl font-bold mt-8 mb-4">{genretype} Anime - Page {pageNO}</h1>
</div>
