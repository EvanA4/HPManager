<script lang="ts">
	import { clickOutside } from "$lib/utils/clickOutside";

	interface NewBlogObj {
		title: string;
		summary: string;
		content: string;
	}


	let { hidden, changeToHide, blogObj } = $props()
	let newblog = $state<NewBlogObj>({
		title: blogObj.title,
		summary: blogObj.summary,
		content: blogObj.content
	})


	function handleClick() {
		if (!hidden) changeToHide();
	}
</script>


<div
	use:clickOutside={(e) => {
		handleClick();
	}}
	class={"z-40 transition-width ease-in duration-500 fixed top-[50px] left-0 overflow-hidden " + (hidden ? "w-0" : "w-[50vw]")}
>
	<div class="h-[100vh] overflow-hidden w-[50vw] border-r-2 border-neutral-800 bg-neutral-900 px-5 flex flex-col justify-between">
		<div>
			<div class="w-[100%] py-5">
				<input 
					type="text" placeholder="Title of Your Blog"
					value={blogObj.title}
					oninput={(e: any) => {
						newblog.title = e.target.value
					}}
					class={
						"text-white border-neutral-600 focus:border-blue-400 placeholder-neutral-300 " +
						"block bg-transparent border-b-[1px] text-3xl focus:outline-none h-[50px] w-full"
					}
				>
				<textarea
					placeholder="Description"
					oninput={(e: any) => {
						newblog.summary = e.target.value
					}}
					class={
						"border-neutral-600 focus:border-blue-400 text-white placeholder-neutral-300 bg-black "
						+ "w-[100%] mt-5 p-3 block rounded-xl border h-[100px] resize-none outline-none"
					}
				>{blogObj.summary}</textarea>
			</div>
			<textarea
				placeholder="Content"
				oninput={(e: any) => {
					newblog.content = e.target.value
				}}
				class={
					"bg-black border border-neutral-600 focus:border-blue-400 text-white placeholder-neutral-300 "
					+ "w-[100%] h-[50vh] p-3 font-mono outline-none rounded-lg resize-none scrollbar-none"
				}
			>{blogObj.content}</textarea>
		</div>
	
		<div class="flex gap-10">
			<button onclick={() => {
				console.log($state.snapshot(newblog));
			}} class='bg-blue-500 hover:bg-blue-400 text-white px-7 py-3 rounded-[10px] w-min mb-[80px]'>POST</button>
			<button
				onclick={() => {
					changeToHide();
				}}
				class='bg-red-500 hover:bg-red-400 text-white px-7 py-3 rounded-[10px] w-min mb-[80px]'
			>CANCEL</button>
		</div>
	</div>
</div>