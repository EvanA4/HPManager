<script lang="ts">
  var num = 0;

  function addOne() {
    ++num;
  }
</script>

<main>
  <div class="flex flex-row items-center justify-center h-[100vh] w-[100%]">
    <div class="flex flex-col items-center gap-3 p-3 rounded-lg bg-neutral-800">
      <h1 class="text-green-500 text-3xl">HomePages Manager</h1>
      <p class="text-white text-2xl">{num}</p>
      <button class="bg-white px-3 py-2 rounded-lg" on:click={addOne}>Add 1</button>
    </div>
  </div>
</main>