import Hls, {
  Loader,
  LoaderCallbacks,
  LoaderConfiguration,
  LoaderContext,
  LoaderResponse,
  LoaderStats,
  HlsConfig
} from 'hls.js';
import { useEffect, useRef } from 'react';

class CustomLoader implements Loader<LoaderContext> {
  private loader: Loader<LoaderContext>;

  constructor(config: HlsConfig) {
    const DefaultLoader = Hls.DefaultConfig.loader as new (config: HlsConfig) => Loader<LoaderContext>;
    this.loader = new DefaultLoader(config);
  }

  load(context: LoaderContext, config: LoaderConfiguration, callbacks: LoaderCallbacks<LoaderContext>) {
    const { onSuccess, onError, onTimeout, onAbort, onProgress } = callbacks;

    const newCallbacks: LoaderCallbacks<LoaderContext> = {
      onSuccess: (response: LoaderResponse, stats: LoaderStats, context: LoaderContext, networkDetails: any = null) => {
        onSuccess(response, stats, context, networkDetails);
      },
      onError: (
        error: { code: number; text: string },
        context: LoaderContext,
        networkDetails: any = null,
        stats: LoaderStats
      ) => {
        if (error.code === 404) {
          const emptyData = new ArrayBuffer(0);
          onSuccess(
            {
              url: context.url,
              data: emptyData
            },
            {
              trequest: performance.now(),
              tfirst: performance.now(),
              tload: performance.now(),
              loaded: 0,
              total: 0
            } as unknown as LoaderStats,
            context,
            networkDetails
          );
        } else {
          if (onError) {
            onError(error, context, networkDetails, stats);
          }
        }
      },
      onTimeout: (stats: LoaderStats, context: LoaderContext, networkDetails: any = null) => {
        if (onTimeout) {
          onTimeout(stats, context, networkDetails);
        }
      },
      onAbort: (stats: LoaderStats, context: LoaderContext, networkDetails: any = null) => {
        if (onAbort) {
          onAbort(stats, context, networkDetails);
        }
      },
      onProgress: (
        stats: LoaderStats,
        context: LoaderContext,
        data: string | ArrayBuffer,
        networkDetails: any = null
      ) => {
        if (onProgress) {
          onProgress(stats, context, data, networkDetails);
        }
      }
    };

    this.loader.load(context, config, newCallbacks);
  }

  abort() {
    this.loader.abort();
  }

  destroy() {
    this.loader.destroy();
  }

  get stats() {
    return this.loader.stats;
  }

  get context() {
    return this.loader.context;
  }
}

export default function usePlayer(url: string) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (!videoElement || !url) return;

    const isNativeHLS = videoElement.canPlayType('application/vnd.apple.mpegurl');

    if (isNativeHLS) {
      videoElement.src = url;
      videoElement.play();
      return;
    }

    const hls = new Hls({
      enableWorker: true,
      lowLatencyMode: true,
      loader: CustomLoader
    });

    hls.loadSource(url);
    hls.attachMedia(videoElement);

    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      videoElement.play();
    });

    return () => {
      hls.destroy();
    };
  }, [url]);

  return videoRef;
}
