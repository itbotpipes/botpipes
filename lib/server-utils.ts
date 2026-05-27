"use server";

export interface UnsplashResult {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
    small_s3?: string;
  };
}

export async function FetchUnsplashImages(query: string, pages: number = 10) {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?query=${query}&count=${pages}`,
    {
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
    },
  );

  if (response.status !== 200) throw new Error("error fetching");

  const data = (await response.json()) as UnsplashResult[];

  return data;
}
