<script lang="typescript">
  import EditSingleModal from "./components/EditSingleModal.svelte";
  import EditEditorModal from "./components/EditEditorModal.svelte";
  import EditImageModal from "./components/EditImageModal.svelte";
  import SpinnerLoader from "./components/SpinnerLoader.svelte";
  import LoadingSpinnerStore from "./stores/loading-spinner.store";
  import { Route, router } from "tinro";
  import Home from "./views/Home.svelte";
  import Login from "./views/Login.svelte";
  import { onMount } from "svelte";
  import AuthService from "./services/auth.service";
  
  onMount(async () => {
    const user = await AuthService.getUserInit();
    if (!user) {
      router.goto("/login");
    }
  });
</script>

<div class="App">
  {#if $LoadingSpinnerStore}
    <SpinnerLoader />
  {/if}
  <EditSingleModal />
  <EditEditorModal />
  <EditImageModal />
  <div class="container">
    <div class="bgimage" />
    <div class="content">
      <Route path="/"><Home /></Route>
      <Route path="/login"><Login /></Route>
    </div>
  </div>
</div>

<style>
  .App {
    position: relative;
  }

  .container {
    display: flex;
    justify-content: center;
    font-weight: var(--text-font-weight-normal);
  }

  .bgimage {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: url("images/bgimage.jpg") no-repeat;
    background-size: cover;
    background-position: center;
    filter: blur(8px);
    z-index: -1;
  }

  .content {
    position: relative;
    padding: 0 1rem;
  }

  @media only screen and (max-width: 612px) {
    .content {
      padding: 0;
    }
    .bgimage {
      background: none;
    }
  }
</style>
