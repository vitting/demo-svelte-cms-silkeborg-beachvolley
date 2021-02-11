  import Home from "../views/Home.svelte";
  import Login from "../views/Login.svelte";
  import Init from "../views/Init.svelte";
  const routes = {
    "/": Home,
    "/login": Login,
    "/init": Init
  };

  export default routes;