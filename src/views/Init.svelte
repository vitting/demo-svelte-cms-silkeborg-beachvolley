<script lang="ts">
  import DatabaseService from "../services/database.service";
  
  async function runInit() {
      const choise = confirm("100% sure You want to init DB? existing data will be overwritten?")
    console.log(choise);
    
      if (choise) {
        await DatabaseService.addTestData();
      }
  }
</script>

<div class="container">
    <h1>Init firestore with testdata</h1>
    <button class="btn" on:click={runInit}>Start init</button>
</div>



<style>
  .container {
      padding: 1rem;
      background-color: #fff;
  }
</style>
