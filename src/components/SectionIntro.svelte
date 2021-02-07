<script lang="ts">
  export let theme: number = 0; // Theme 0 = standard
  export let text: string = "";
  export let image: string;
</script>

<div
  class="s-image-desc-container"
  class:theme-1={theme === 0}
  class:theme-2={theme === 1}
>
  <div class="s-desc">
    {text}
  </div>
  <div class="s-image">
    <picture><img src="./images/{image}" alt="" /></picture>
  </div>
</div>

<style>
  .s-image-desc-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }

  .s-image {
    margin-top: 5px;
  }

  .s-image img {
    width: 100%;
    object-fit: cover;
    border-radius: var(--border-radius);
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.164);
  }

  .theme-2 .s-desc {
    order: 2;
  }

  .theme-2 .s-image {
    order: 1;
  }

  @media screen and (max-width: 612px) {

    .s-image {
      justify-self: center;
    }
    .s-image img {
      width: min(200px, 300px);
    }
    .theme-2 .s-desc {
      order: 1;
    }

    .theme-2 .s-image {
    order: 2;
  }
  }
</style>
