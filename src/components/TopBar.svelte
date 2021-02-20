<script lang="ts">
  import { mdiMenu } from "@mdi/js";
  import Icon from "./Icon.svelte";

  let navWrapperEl: HTMLDivElement;
  function handleClick(id: string) {
    console.log("CLICK", id);
    document.getElementById(id)?.scrollIntoView();
  }

  function handleMenu() {
    if (navWrapperEl.style.display === "block") {
      navWrapperEl.style.display = "none";
    } else {
      navWrapperEl.style.display = "block";
    }
  }
</script>

<header class="top">
  <div class="logo-container">
    <div class="logo-content">
      <img src="./images/logo500x500_3.png" alt="" class="logo" />
      <div class="logo-name">Silkeborg Beachvolley</div>
    </div>
    <button class="menu-button" on:click={handleMenu}>
      <div class="menu" role="menu">
        <Icon path={mdiMenu} class="icon" />
      </div>
    </button>
  </div>

  <div class="nav-wrapper" bind:this={navWrapperEl}>
    <nav class="nav">
      <ul>
        <!-- svelte-ignore a11y-missing-attribute -->
        <li>
          <a
            on:click={() => {
              handleClick("home");
            }}>Forside</a
          >
        </li>
        <li><a href="#coach">Træning</a></li>
        <li><a href="">Kontakt</a></li>
        <li><a href="">Bliv medlem</a></li>
        <li><a href="">Bestyrelsen</a></li>
      </ul>
    </nav>
  </div>
</header>

<style>
  .top {
    font-family: var(--top-font-family);
    background: var(--bgcolor-theme2-color1);
    color: var(--text-color-theme2);
    padding: 1rem 0;
    width: 100%;
    position: relative;
  }

  .logo-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 1rem;
  }

  .logo-content {
    display: flex;
    align-items: center;
  }

  .logo {
    width: 50px;
    height: 50px;
  }

  .logo-name {
    font-size: 2em;
    font-weight: bold;
    padding: 0 1rem;
  }

  .nav-wrapper {
    display: block;
  }
  .nav {
    color: white;
    margin-top: 10px;
  }

  .nav ul {
    list-style: none;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .nav ul li {
    padding: 0.5rem;
    white-space: nowrap;
    transition: all 0.4s;
    cursor: pointer;
  }

  .nav ul li:hover {
    background: var(--bgcolor-theme2-color2);
    border-radius: var(--border-radius);
  }

  .nav ul li a {
    text-decoration: none;
    color: var(--text-color-theme2);
  }

  .menu-button {
    background-color: transparent;
    border: none;
    display: none;
  }
  .menu {
    width: 25px;
    height: 25px;
    color: white;
    cursor: pointer;
  }

  @media screen and (max-width: 612px) {
    .logo-name {
      font-size: 1.5em;
    }

    .nav-wrapper {
      display: none;
    }

    .nav {
      display: flex;
      justify-content: flex-end;
    }

    .nav ul {
      display: block;
      padding-right: 1rem;
    }
    .menu-button {
      display: block;
    }
    .logo-container {
      justify-content: space-between;
    }

    .logo {
      width: 30px;
      height: 30px;
    }
  }
</style>
