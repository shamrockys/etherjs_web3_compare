import React from 'react';
import { CacheProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';

import createEmotionCache from '../utils/createEmotionCache';
import '../styles/base.css';

const theme = {};

const clientSideEmotionCache = createEmotionCache();

const MyApp = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <CssBaseline />
      <Component {...pageProps} />
    </CacheProvider>
  );
};

export default MyApp;