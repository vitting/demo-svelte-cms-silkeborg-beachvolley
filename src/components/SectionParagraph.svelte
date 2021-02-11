<script lang="ts">
  import type { ContentParagraph } from "src/interfaces/content-paragraph";
  import EditBar from "./EditBar.svelte";
  export let data: ContentParagraph;
</script>

{#if data}
  
  <div class="s-paragraph-container">
    <div class="s-editbar"><EditBar move={true} edit={true} remove={true} ></EditBar></div>
  <p class="s-paragraph">
    
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat mollitia
    impedit necessitatibus laboriosam nihil eligendi quaerat, officia commodi!
    Recusandae similique modi quasi distinctio, beatae repellat saepe assumenda
    molestias delectus repellendus. Veritatis dolorem molestiae placeat officia,
    voluptas laudantium ipsum ipsa quaerat ex beatae exercitationem corrupti
    voluptatum non laboriosam labore repudiandae sit, aperiam quos a, tempore
    eveniet deserunt magni quas ab? Blanditiis!
  </p>
  </div>
{/if}

<style>
  .s-paragraph {
    margin: 2rem 0;
  }

  .s-paragraph-container {
    position: relative;
  }

  .s-editbar {
    position: absolute;
    top: -2rem;
  }
</style>
