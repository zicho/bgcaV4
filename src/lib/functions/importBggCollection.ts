import type { BggGameSimple } from "$lib/types/bgg/bggGameSimple";

export async function importBggCollection(username: string) {
    try {
      const response = await fetch(`https://bgg-json.azurewebsites.net/collection/${username}`);
      const data = await response.json();
      console.log(data[0] as BggGameSimple);
      // Handle the response data as needed
    } catch (error) {
      console.error('Error:', error);
      // Handle any errors that occur during the request
    }
  }