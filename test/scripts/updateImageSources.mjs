import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8080');

async function updateImageSources() {
  try {
    // Authenticate first
    const authData = await pb.admins.authWithPassword('valiantlynxz@gmail.com', '1234567890');
    console.log("Authentication successful:", authData);

    // Fetch all manga records
    const mangas = await pb.collection('mangas').getFullList({
      sort: '-created',
    });

    for (const manga of mangas) {
      // Check if the src field exists and needs updating
      if (manga.src) {
        console.log(`from ${manga.src}`)
        // Use split to remove the domain origin
        const parts = manga.src.split('.com');
        const newsrc = parts.length > 1 ? parts[1] : manga.src; // Use the part after '.com' if available

        console.log(`to ${newsrc}`)
        // Update the record with the new src source
        await pb.collection('mangas').update(manga.id, { tempsrc: newsrc });
        console.log(`Updated manga ${manga.id} src to ${newsrc}`);
      }
    }
  } catch (error) {
    console.error('Failed to update manga records:', error);
    if (error.response) {
      console.error('Detailed error:', error.response.data);
    }
  }
}

// Execute the main function
updateImageSources();
