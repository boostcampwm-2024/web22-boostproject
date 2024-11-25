export const REDIS_CONFIG = {
  clusters: [
    {
      host: 'redisc-2vucs8.vpc-cdb.ntruss.com',
      port: 6379,
    },
    {
      host: 'redisc-2vucsb.vpc-cdb.ntruss.com',
      port: 6379,
    },
    {
      host: 'redisc-2vucse.vpc-cdb.ntruss.com',
      port: 6379,
    },
  ],
  options: {
    maxRetriesPerRequest: 3,
    retryDelayOnFailover: 5000,
    retryDelayOnClusterDown: 5000,
    enableReadyCheck: true,
    slotsRefreshTimeout: 10000,
  },
};
