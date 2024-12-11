

<script lang="ts">
	interface BlogSnippet {
		id: number;
		title: string;
		summary: string;
		posted: string;
	}

  	import { onMount } from 'svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import NewBlog from '$lib/components/NewBlog.svelte';
	import blogImg from '../../public/blogs.png'
  import { hide } from '@tauri-apps/api/app';

	async function getprom() {
		let myprom = await fetch('/api/blogs');
		let myblob = await myprom.blob();
		return await myblob.text();
	}

	let snippets = $state<BlogSnippet[]>([]);
	let searchText = $state<string>("");
	let hideNewBlog = $state<boolean>(true);
	
	onMount(async () => {
		let raw: BlogSnippet[] = JSON.parse(await getprom())[0];

		for (let i = 0; i < raw.length; ++i) {
			// create new time
			let newTime = raw[i].posted.replaceAll('T', ' ').split('.')[0]
			let t: any = newTime.split(/[- :]/);
			let dateObj = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));
			let options: any = { year: 'numeric', month: 'long', day: 'numeric' };
	
			// add new snippet
			let snippet: BlogSnippet = {
				id: raw[i].id,
				posted: dateObj.toLocaleDateString("en-US", options),
				title: raw[i].title,
				summary: raw[i].summary
			};
			snippets.push(snippet);
		}
	})

	function changeToHide() {
		hideNewBlog = !hideNewBlog;
	}

</script>


<div class="relative">
	<Navbar />
	<NewBlog hidden={hideNewBlog} changeToHide={changeToHide}/>

	<div class='w-[100%] my-[4vh] flex flex-col justify-center items-center p-3 relative'>
		<img src={blogImg} alt="blog display">
		<p class='text-neutral-200 mt-5'>Welcome to the blogs page!</p>

		<div class='absolute left-0 bottom-[10vh] rotate-[30deg] z-0 w-[48vw] min-w-[200px] h-[14vh] -ml-[28vh] rounded-full blur-[10vh] bg-green-800'></div>
		<div class='absolute left-0 bottom-0 rotate-[30deg] z-0 w-[20vw] h-[10vh] -ml-[7vh] rounded-full blur-[7vh] bg-green-600'></div>
	</div>


	<div class='p-3 w-[100%] flex gap-3 justify-center static'>
		<input type="text" oninput={(e: any) => {searchText = e.target.value}} placeholder='Search or scroll!' class='w-[60vw] rounded-full py-3 px-4 text-black z-10'/>
		<button class='bg-blue-500 hover:bg-blue-400 text-white px-3 rounded-[10px]'>Search</button>
		<button
			id="openBtn"
			onclick={() => {
				if (hideNewBlog) changeToHide();
			}}
			class='bg-green-500 hover:bg-green-400 text-white px-3 rounded-[10px]'
		>New Blog</button>
	</div>

	<div class='flex flex-col gap-[25px] w-[100%] justify-center items-center px-5 pb-[50px] pt-[50px]'>
		{#each snippets as snippet}
			<a href={'blogs/' + snippet.title.replaceAll(' ', '+')} class='w-[100%] z-20'>
				<div class='text-white p-3 border-white border-2 rounded-[15px] bg-black'>
					<p class='text-lg'><b>{snippet.title}</b></p>
					<p class='text-neutral-300'>{snippet.posted}</p>
					<br/>
					<p>{snippet.summary}</p>
				</div>
			</a>
		{/each}
	</div>
</div>