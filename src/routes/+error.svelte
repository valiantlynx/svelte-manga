<script>
    import { page } from '$app/stores';

    function goBack() {
        window.history.back();
    }

</script>

  
  <main>
    <h1>{$page.status}: {$page.error?.message}</h1>
    <button on:click={goBack}>Go Back</button>
  </main>
  
  <style>
    main {
      padding: 2rem;
      text-align: center;
    }
  
    h1 {
      font-size: 2rem;
      margin-bottom: 1rem;
    }
  </style>
  