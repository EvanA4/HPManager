<script lang="ts">
    let { display } = $props();
    let num = $state(0);
  
    function addOne() {
      ++num;
    }
</script>

<div class="flex flex-col items-center gap-3 py-4 px-7 rounded-lg bg-neutral-800">
    <h1 class="text-green-500 text-3xl">{display}</h1>
    <p class="text-white text-2xl">{num}</p>
    <button class="bg-white px-3 py-2 rounded-lg" onclick={addOne}>Add 1</button>
</div>