export interface Playlist {
  name: string;
  items: PlaylistItem[];
}

export interface PlaylistItem {
  youtubeId: string;
  name?: string;
  group?: string;
  party?: string;
  platform?: string;
  description?: string;
  thumbnailUrl?: string;
}

export function getItemFromPlaylist(playlist: Playlist, index: number): PlaylistItem {
  const item = playlist.items[index];

  if (!item) {
    throw new Error(`Item at index ${index} not found in playlist`);
  }

  // TODO: could use the YoutTube API to fill in any missing info.

  return item;
}

export const testPlaylist: Playlist = {
  name: 'Test Playlist',
  items: [
    {
      youtubeId: '6AUpZNq2vSQ',
      name: 'fr-025: the.popular.demo',
      group: 'Farbrausch',
      party: '1st at Breakpoint 2003',
      platform: 'PC',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.',
      thumbnailUrl: 'https://content.pouet.net/files/screenshots/00009/00009450.jpg'
    },
    {
      youtubeId: 'dQw4w9WgXcQ',
      name: 'Rick Astley - Never Gonna Give You Up',
      group: 'Rick Astley',
      party: 'Rick Roll',
      platform: 'YouTube',
      description: 'Rick Astley - Never Gonna Give You Up (Official Music Video)',
      thumbnailUrl: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg'
    },
  ]
};