<script lang="ts">
  // your script goes here
</script>

<header class="top">
  <div class="logo-container">
    <img src="./images/logo500x500_3.png" alt="" class="logo" />
    <div class="logo-name">Silkeborg Beachvolley</div>
  </div>
  <nav class="nav">
    <ul>
      <li><a href="#home">Forside</a></li>
      <li><a href="#coach">Træning</a></li>
      <li><a href="">Kontakt</a></li>
      <li><a href="">Bliv medlem</a></li>
      <li><a href="">Bestyrelsen</a></li>
    </ul>
  </nav>
</header>

<style>
  .top {
    font-family: var(--top-font-family);
    background: var(--bgcolor-theme2-color1);
    color: var(--text-color-theme2);
    padding: 1rem 0;
  }
  
  .logo-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logo {
    width: 50px;
    height: 50px;
    margin-bottom: 10px;
  }

  .logo-name {
    font-size: 2em;
    font-weight: bold;
    padding: 0 1rem;
  }

  .nav {
    color: white;
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
    transition: all 0.5s;
  }

  .nav ul li:hover {
    background: var(--bgcolor-theme2-color2);
    border-radius: var(--border-radius);
  }
  
  .nav ul li a {
    text-decoration: none;
    color: var(--text-color-theme2);
  }
</style>
