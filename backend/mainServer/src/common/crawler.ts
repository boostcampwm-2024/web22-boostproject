import axios from 'axios';

interface LiveData {
  liveId: number;
  liveTitle: string;
  liveImageUrl: string;
  openDate: string;
  defaultThumbnailImageUrl: string | null;
  concurrentUserCount: number;
  adult: boolean;
  categoryType: string;
  liveCategory: string;
  liveCategoryValue: string;
  dropsCampaignNo: number | null;
  livePlaybackJson: string;
  channel: ChannelData;
  livePollingStatusJson: string;
  m3u8: string;
}

interface ChannelData {
  channelId: string;
  channelName: string;
  channelImageUrl: string;
  verifiedMark: boolean;
  activatedChannelBadgeIds: string[];
}

interface ApiResponse {
  code: 200;
  message: null;
  content: {
    topRecommendedLives: LiveData[];
    recommendedContents: LiveData[];
  }
}

export async function chzzkMainFetch(): Promise<LiveData[] | null> {
  try {
    const apiUrl = 'https://api.chzzk.naver.com/service/v1.1/home/recommended?deviceType=PC';
    const headers = {
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'Accept-Encoding': 'gzip, deflate, br, zstd',
      'Accept-Language': 'ko-KR,ko;q=0.9',
      'Cache-Control': 'max-age=0',
      Priority: 'u=0, i',
      'Sec-Ch-Ua':
        '"Google Chrome";v="131", "Chromium";v="131", "Not_A_Brand";v="24"',
      'Sec-Ch-Ua-Mobile': '?0',
      'Sec-Ch-Ua-Platform': '"macOS"',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'none',
      'Sec-Fetch-User': '?1',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    };

    const response = await axios.get<ApiResponse>(apiUrl, { headers });
    const topData = response.data.content.topRecommendedLives;
    const m3u8Regex = /RESOLUTION=\d+x\d+\s+(.*?\.m3u8)/;

    const topM3u8 = await Promise.all(
      topData.map(async (data) => {
        const playbackJson = await JSON.parse(data.livePlaybackJson);
        const mediaPath = playbackJson.media[0].path;
        const playlist = await axios.get(mediaPath, { headers });
        const parsedM3u8 = m3u8Regex.exec(playlist.data);
        if (parsedM3u8 !== null) {
          return {...data, m3u8: `${await mediaPath.split('hls_playlist.m3u8')[0]}${parsedM3u8[1]}`};
        } else {
          return {...data, m3u8: 'https://kr.object.ncloudstorage.com/web22/live/mock_ifkakao/index.m3u8'};
        }
      })
    );

    return topM3u8;
  } catch (error) {
    console.error('API 요청 중 오류 발생:', error);
    return null;
  }
}

export async function getLastSegment(m3u8Url: string): Promise<[number, number] | false> {
  try {
    const indexM3u8 = await axios.get(m3u8Url);
    const durationRegex = /#EXTINF:(\d+\.\d+)/;
    const indexRegex = /index(\d+).ts/;
    const [durationData, indexData] = indexM3u8.data.trim().split('\n').slice(-2);
    return [Number(indexData.match(indexRegex)[1]), Number(durationData.match(durationRegex)[1])];
  } catch(err) {
    console.log(err);
    return false;
  }
}