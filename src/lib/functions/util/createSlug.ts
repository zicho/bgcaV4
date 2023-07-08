export function createSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Convert spaces to dashes
      .replace(/-+/g, '-'); // Replace consecutive dashes with a single dash
  }