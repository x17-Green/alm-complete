// Integration with Spotify API.

import SpotifyWebApi from 'spotify-web-api-node';
import dotenv from 'dotenv';

dotenv.config();

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

const MAX_RETRIES = 3;

async function getAccessToken() {
  let attempts = 0;
  while (attempts < MAX_RETRIES) {
    try {
      const data = await spotifyApi.clientCredentialsGrant();
      spotifyApi.setAccessToken(data.body['access_token']);
      return; // Exit the function if successful
    } catch (error) {
      attempts++;
      console.error(`Attempt ${attempts} to get Spotify access token failed:`, error); // Log the full error
      if (attempts >= MAX_RETRIES) {
        throw new Error('Failed to get Spotify access token after multiple attempts');
      }
    }
  }
}

export const getTrackInfo = async (trackId) => {
  try {
    await getAccessToken();
    const data = await spotifyApi.getTrack(trackId);
    return data.body;
  } catch (error) {
    console.error('Error getting track info from Spotify:', error.message);
    throw error;
  }
};

export const searchTracks = async (query) => {
  try {
    await getAccessToken();
    const data = await spotifyApi.searchTracks(query);
    return data.body.tracks.items;
  } catch (error) {
    console.error('Error searching tracks on Spotify:', error.message);
    throw error;
  }
};

export const searchTrack = async (title, artist) => {
  try {
    await getAccessToken();
    const data = await spotifyApi.searchTracks(`track:${title} artist:${artist}`);
    if (data.body.tracks.items.length > 0) {
      const track = data.body.tracks.items[0];
      return {
        spotifyId: track.id,
        previewUrl: track.preview_url,
        imageUrl: track.album.images[0].url
      };
    }
    return null;
  } catch (error) {
    console.error('Error searching track on Spotify:', error.message);
    throw error;
  }
};
