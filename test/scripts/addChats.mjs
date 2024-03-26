import PocketBase from 'pocketbase';

const pb = new PocketBase('https://whalescans.fly.dev');
const pblocal = new PocketBase('http://localhost:8080');

async function movechats() {
  try {
    // Authenticate first
    const authData = await pb.admins.authWithPassword('valiantlynxz@gmail.com', '***');
    console.log("Authentication remote successful:");
    const authDataLocal = await pblocal.admins.authWithPassword('valiantlynxz@gmail.com', '***');
    console.log("Authentication local successful:");

    // Fetch all local chats records
    const chats = await pblocal.collection('chat_animevariant').getFullList({
      sort: '-created',
    });

    for (const chat of chats) {
        console.log(`creating chat: ${chat.message}`)
        await pb.collection('chat_animevariant').create(chat);
        console.log(`created`)
    }
  } catch (error) {
    console.error('Failed to create chat records:', error);
    if (error.response) {
      console.error('Detailed error:', error.response.data);
    }
  }
}

// Execute the main function
movechats();
