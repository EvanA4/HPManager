<script lang="ts">
	import ExpSide from '$lib/components/ExpSide.svelte';
import Navbar from '$lib/components/Navbar.svelte';
	import TrashImg from '$lib/public/btrash.svg';
	import ExpImg from '$lib/public/experiences.png';
  	import { type Exp } from '$lib/types/types';

	let hideSidePage = $state(true);
	let searchText = $state("");
	let newTitle = $state("");
	let newLink = $state("");
	let newTimeperiod = $state("");
	let newBullets = $state("");
	let exps = $state<Exp[]>([]);

	async function refreshExps() {

	}

	let slide = {
		header: "SULI Intern at ORNL",
		date: "Summer 2023",
		bullets: [
			"Committed changes to group Github repositories",
			"Presented my contributions at meetings",
			"Designed object recognition for point clouds",
			"Utilized the KD-Tree nearest neighbor(s) search algorithm"
		]
	};
</script>


<div>
	<Navbar />
	<ExpSide bind:toHide={hideSidePage} bind:newTitle={newTitle} bind:newLink={newLink} bind:newTimeperiod={newTimeperiod} bind:newBullets={newBullets} refreshExps={refreshExps}/>

	<div class='w-[100%] my-[4vh] flex flex-col justify-center items-center p-3 relative'>
		<img src={ExpImg} alt="blog display">
		<p class='text-neutral-200 mt-5'>Welcome to the experiences page!</p>

		<div class='absolute left-0 bottom-[10vh] rotate-[30deg] z-0 w-[48vw] min-w-[200px] h-[14vh] -ml-[28vh] rounded-full blur-[10vh] bg-green-800'></div>
		<div class='absolute left-0 bottom-0 rotate-[30deg] z-0 w-[20vw] h-[10vh] -ml-[7vh] rounded-full blur-[7vh] bg-green-600'></div>
	</div>


	<div class='p-3 w-[100%] flex gap-3 justify-center static'>
		<input type="text" bind:value={searchText} placeholder='Search or scroll!' class='w-[60vw] rounded-full py-3 px-4 text-black z-10'/>
		<button onclick={async () => {
			// exps = await GetExps(searchText)
		}} class='bg-blue-500 hover:bg-blue-400 text-white px-3 rounded-[10px]'>Search</button>
		<button
			id="openBtn"
			onclick={() => {
				newTitle = ""
				newLink = ""
				newTimeperiod = ""
				newBullets = ""
				if (hideSidePage) hideSidePage = false;
			}}
			class='bg-green-500 hover:bg-green-400 text-white px-3 rounded-[10px]'
		>New Experience</button>
	</div>


	<div class='w-[350px] h-[450px] bg-white rounded-[30px] shadow-md p-5 relative'>
		<p class='text-[25px]'><b>{slide.header}</b></p>
		<p>{slide.date}</p>
		<br/>
		<ul class='list-disc px-5'>
			{#each slide.bullets as bullet}
				<li>{bullet}</li>
			{/each}
		</ul>
		<button class="absolute left-[50%] -translate-x-[50%] bottom-[25px] w-[35px] h-[35px] hover:opacity-75">
			<img src={TrashImg} alt="A Trash Bin">
		</button>
	</div>
</div>