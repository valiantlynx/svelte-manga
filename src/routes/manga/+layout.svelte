<script>
    /**
     * @type {string}
     */
     export let currentPath;
  </script>
  
  <nav>
    <a href="/" class:selected={currentPath === "/"}>Home</a>
    <a href="/manga" class:selected={currentPath === "/manga"}>Manga</a>
    <a href="/about" class:selected={currentPath === "/about"}>About</a>
    
  </nav>
  
  <style>
    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      background-color: #f0f0f0;
    }
  
    a {
      margin-right: 1rem;
      color: #333;
      text-decoration: none;
    }
  
    a:hover {
      text-decoration: underline;
    }
  
    .selected {
      font-weight: bold;
    }
  
    @media (max-width: 600px) {
      nav {
        flex-direction: column;
        align-items: flex-start;
      }
  
      a {
        margin-bottom: 0.5rem;
      }
    }
  </style>
  

<slot></slot>