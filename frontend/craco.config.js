export const webpack = {
  configure: {
    resolve: {
      fallback: {
        zlib: false,
        crypto: false,
        stream: false,
        fs: false,
        path: false,
        https:false,
        http:false
      },
    },
  },
};