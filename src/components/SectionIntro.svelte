<script lang="ts">
  export let text: string = "";
  export let image: string;
</script>

<div class="s-image-desc-container">
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
  }
</style>
