interface User {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export interface Artist {
  id: string;
  name: string;
  grammy: boolean;
}

export interface Track {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

export interface Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}

interface Favorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

export default {
  users: [] as User[],
  artists: [] as Artist[],
  tracks: [] as Track[],
  albums: [] as Album[],
  favorites: {
    artists: [],
    albums: [],
    tracks: [],
  } as Favorites,
};
