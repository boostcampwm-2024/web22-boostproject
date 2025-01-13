import Hls, { Loader, LoaderCallbacks, LoaderConfiguration, LoaderContext, HlsConfig } from 'hls.js';
import { useEffect, useRef } from 'react';

class CustomLoader implements Loader<LoaderContext> {
  private loader: Loader<LoaderContext>;
  private retryCount: number = 0;
  private maxRetries: number = 6;
  private retryDelay: number = 3000;
  private DefaultLoader: new (config: HlsConfig) => Loader<LoaderContext>;

  constructor(config: HlsConfig) {
    this.DefaultLoader = Hls.DefaultConfig.loader as new (config: HlsConfig) => Loader<LoaderContext>;
    this.loader = new this.DefaultLoader(config);
  }

  private createNewLoader(): Loader<LoaderContext> {
    return new this.DefaultLoader({
      ...Hls.DefaultConfig,
      enableWorker: true,
      lowLatencyMode: true
    });
  }

  private retryLoad(context: LoaderContext, config: LoaderConfiguration, callbacks: LoaderCallbacks<LoaderContext>) {
    this.loader = this.createNewLoader();

    setTimeout(() => {
      const retryCallbacks: LoaderCallbacks<LoaderContext> = {
        ...callbacks,
        onError: (error, context, networkDetails, stats) => {
          if (error.code === 404 && this.retryCount < this.maxRetries) {
            this.retryCount++;
            this.retryLoad(context, config, callbacks);
          } else {
            this.retryCount = 0;
            if (callbacks.onError) {
              callbacks.onError(error, context, networkDetails, stats);
            }
          }
        }
      };

      this.loader.load(context, config, retryCallbacks);
    }, this.retryDelay);
  }

  load(context: LoaderContext, config: LoaderConfiguration, callbacks: LoaderCallbacks<LoaderContext>) {
    const modifiedCallbacks: LoaderCallbacks<LoaderContext> = {
      ...callbacks,
      onSuccess: (response, stats, context, networkDetails) => {
        this.retryCount = 0;
        if (callbacks.onSuccess) {
          callbacks.onSuccess(response, stats, context, networkDetails);
        }
      },
      onError: (error, context, networkDetails, stats) => {
        if (error.code === 404 && this.retryCount < this.maxRetries) {
          this.retryCount++;
          this.retryLoad(context, config, callbacks);
        } else {
          this.retryCount = 0;
          if (callbacks.onError) {
            callbacks.onError(error, context, networkDetails, stats);
          }
        }
      }
    };

    this.loader.load(context, config, modifiedCallbacks);
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

    hls.on(Hls.Events.ERROR, (event, data) => {
      if (data.fatal) {
        switch (data.type) {
          case Hls.ErrorTypes.NETWORK_ERROR:
            hls.startLoad();
            break;
          case Hls.ErrorTypes.MEDIA_ERROR:
            hls.recoverMediaError();
            break;
          default:
            hls.destroy();
            break;
        }
      }
    });

    return () => {
      hls.destroy();
    };
  }, [url]);

  return videoRef;
}
