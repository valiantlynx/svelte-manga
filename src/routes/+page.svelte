<!-- index.svelte -->
<script>
   
  </script>
  
  <main>
    <h1>Welcome to Animevariant</h1>
  
    <nav>
      <a href={'/about'} aria-label="Go to about page">Go to About Page</a>
      <a href={'/manga'} aria-label="Go to manga page">Go to Manga Page</a>
    </nav>
  </main>
  
  <footer>
    <p>the website works fine, I just suck at CSS</p>
  </footer>
  
  <style>
    main {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      text-align: center;
      background-color: #f7f7f7;
    }
  
    h1 {
      font-size: 3rem;
      margin-bottom: 2rem;
    }
  
    nav {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 2rem;
    }
  
    a {
      display: inline-block;
      padding: 1rem 2rem;
      background-color: #ff6f00;
      color: #ffffff;
      font-weight: bold;
      text-decoration: none;
      border-radius: 5px;
      transition: background-color 0.3s ease;
    }
  
    a:hover {
      background-color: #ff9d3f;
    }
  
    footer {
      text-align: center;
      padding: 1rem;
      background-color: #333333;
      color: #ffffff;
    }
  </style>
  