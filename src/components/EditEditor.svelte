<script lang="ts">
  import Quill from "quill";
  import ImageResize from "quill-image-resizer-plugin";
  import { onMount } from "svelte";

  export let html: string;
  export let value = "";
  let quill: Quill;
  onMount(() => {
    value = html;
    Quill.register('modules/imageResize', ImageResize);
    quill = new Quill("#editor", {
      modules: {
        imageResize: {},
        toolbar: {
          container: [
            ["bold", "italic"],
            ["link", "blockquote", "code-block", "image"],
            [{ list: "ordered" }, { list: "bullet" }],
          ],
        },
      },
      placeholder: "",
      theme: "snow",
    });

    quill.on("text-change", (data) => {
      // console.log(quill.getContents());
      
      value = quill.root.innerHTML;
    });
  });
</script>

<div class="editor">
  <div id="editor">{@html html}</div>
</div>

<style>
  #editor {
    font-family: var(--font-family);
  }
</style>
