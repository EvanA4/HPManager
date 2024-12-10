

<script lang="ts">
	interface BlogSnippet {
    id: number;
    title: string;
    summary: string;
    posted: object;
	}

  import { onMount } from 'svelte';
	import Navbar from '../../components/Navbar.svelte';

	async function getprom() {
		let myprom = await fetch('/api/blogs');
		let myblob = await myprom.blob();
		return await myblob.text();
	}

	let snippets = $state<BlogSnippet[]>([]);
	
	onMount(async () => {
		snippets = JSON.parse(await getprom());
		console.log(snippets)
	})
</script>

<!-- <div class="flex flex-row items-center justify-center h-[100vh] w-[100%]">
  <NumComp display="HomePages Manager"/>
</div> -->
<div>
	<Navbar />
	<div class="bg-white w-[100px] h-[500px]">
		Welcome to blogs.
	</div>
</div>