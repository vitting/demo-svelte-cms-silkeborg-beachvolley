<script lang="ts">
  import Quill from "quill";
  import ImageResize from "quill-image-resizer-plugin";
  import { onMount } from "svelte";
	import { createEventDispatcher } from 'svelte';
  
  export let html: string;
  let value = "";
  let quill: Quill;

  const dispatch = createEventDispatcher();

  onMount(() => {
    value = html;
    Quill.register("modules/imageResize", ImageResize);
    quill = new Quill("#editor", {
      modules: {
        imageResize: {},
        toolbar: [
          ["bold", "italic"],
          ["link", "image"],
          [{ list: "ordered" }, { list: "bullet" }],
        ],
      },
      placeholder: "",
      theme: "snow",
    });

    quill.on("text-change", (_) => {
      dispatch("textChange", quill.root.innerHTML);
    });
  });
</script>

<div class="editor">
  <div id="editor">{@html html}</div>
</div>

<style>
  #editor {
    font-family: var(--font-family);
    font-size: 1rem;
  }
</style>
