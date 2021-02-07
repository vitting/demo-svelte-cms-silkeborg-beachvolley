<script lang="ts">
  import type { ContentParagraph } from "src/interfaces/content-paragraph";

  export let data: ContentParagraph;
</script>

{#if data}
  <p class="s-paragraph">
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat mollitia
    impedit necessitatibus laboriosam nihil eligendi quaerat, officia commodi!
    Recusandae similique modi quasi distinctio, beatae repellat saepe assumenda
    molestias delectus repellendus. Veritatis dolorem molestiae placeat officia,
    voluptas laudantium ipsum ipsa quaerat ex beatae exercitationem corrupti
    voluptatum non laboriosam labore repudiandae sit, aperiam quos a, tempore
    eveniet deserunt magni quas ab? Blanditiis!
  </p>
{/if}

<style>
  .s-paragraph {
    margin: 2rem 0;
  }
</style>
