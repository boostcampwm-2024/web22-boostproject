export const loadVolume = (): number => {
  const volume = localStorage.getItem('video-player-volume');
  return volume !== null ? parseFloat(volume) : 1;
};

export const saveVolume = (volume: number): void => {
  localStorage.setItem('video-player-volume', volume.toString());
};
