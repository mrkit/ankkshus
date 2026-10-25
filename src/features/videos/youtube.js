// Accepts youtu.be and youtube.com/watch?v= links. Returns null for anything else.
export function youtubeId(url) {
  const match = /(?:youtu\.be\/|[?&]v=)([\w-]{6,})/.exec(url ?? '');
  return match ? match[1] : null;
}
