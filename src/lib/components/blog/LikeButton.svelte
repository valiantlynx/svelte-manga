<script>
	import {onMount,onDestroy} from 'svelte';
    import { page } from '$app/stores';
	import { enhance } from '$app/forms';
    import { pb } from '$lib/utils/api';
    import toast from 'svelte-french-toast';

    const blog = $page.data.blog;
    let isLiked = false;

	let blogLikes = [];

async function getRecords(){
    const records = await pb.collection('valiantlynx_likes').getFullList(200,{
		sort:'-created',
		filter:`contentId='${blog.id}'`
	})
    return records
}



onMount(async ()=>{
	pb.collection('valiantlynx_likes').subscribe('*',async (e)=>{
    blogLikes = await getRecords();
	isLiked = blogLikes.some(like => like.userId === $page.data.user?.id);
})
    blogLikes = await getRecords();
	isLiked = blogLikes.some(like => like.userId === $page.data.user?.id);

})

onDestroy(()=>{
    pb.collection('valiantlynx_likes').unsubscribe('*');
})


	let loading = false;

	const submitLike = () => {
		loading = true;
		if ($page.data.user) {

		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					await update();
					toast.success(result.data.message);
					break;
				case 'invalid':
					toast.error('could not like this blog');
					await update();
					break;
				case 'error':
					toast.error(result.error.message);
					break;
				default:
					await update();
			}
			loading = false;
		};
	} else 
	return async ({ result, update }) => {
			switch (result.type) {
				case 'error':
				toast.error('Please login to like this post');
					break;
				default:
					await update();
			}
			loading = false;
		};{
	
	}
	};
</script>

<form use:enhance={submitLike} action="?/toggleLike" method="POST">
    <input type="hidden" name="blogId" value={blog.id} />
    <input type="hidden" name="userId" value={$page.data.user?.id} />
    <button class="btn btn-outline btn-primary btn-sm flex items-center gap-2">
        <i class="material-icons">{isLiked ? 'thumb_up' : 'thumb_up_off_alt'}</i>
        {isLiked ? 'Liked' : 'Like this Post'}
        <span class="ml-2">({blogLikes.length})</span>
    </button>
</form>

