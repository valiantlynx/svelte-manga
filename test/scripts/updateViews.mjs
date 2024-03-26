import PocketBase from 'pocketbase';

const pb = new PocketBase('https://whalescans.fly.dev');

async function updateImageSources() {
  try {
    // Authenticate first
    const authData = await pb.admins.authWithPassword('valiantlynxz@gmail.com', 'pineapple123');
    console.log("Authentication successful:", authData);

    // Fetch all manga records
    const mangas = await pb.collection('mangas').getFullList({
      sort: '-created',
    });

    for (const manga of mangas) {
      // Check if the img field exists and needs updating
      if (manga.tempimg) {
        console.log(`from ${manga.tempimg}`)
        // Use split to remove the domain origin
        const parts = manga.tempimg.split('/api/mangaimage/');
        const newimg = parts.length > 1 ? parts[1] : manga.tempimg; // Use the part after '.com' if available

        console.log(`to ${newimg}`)
        // Update the record with the new img source
        await pb.collection('mangas').update(manga.id, { img: newimg });
        console.log(`Updated manga ${manga.id} img to ${newimg}`);
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
