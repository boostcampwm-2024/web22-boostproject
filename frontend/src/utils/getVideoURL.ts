export function getLiveURL(liveId: string) {
  return `https://kr.object.ncloudstorage.com/web22/live/${liveId}/index.m3u8`;
}

export function getReplayURL(videoId: string) {
  return `https://kr.object.ncloudstorage.com/web22/live/${videoId}/replay.m3u8`;
}
