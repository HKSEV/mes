"use client";

import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    @font-face {
      font-family: 'Escoredream';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-1Thin.woff') format('woff');
      font-weight: 100;
      font-display: swap;
    }

    @font-face {
      font-family: 'Escoredream';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-2ExtraLight.woff') format('woff');
      font-weight: 200;
      font-display: swap;
    }

    @font-face {
      font-family: 'Escoredream';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-3Light.woff') format('woff');
      font-weight: 300;
      font-display: swap;
    }

    @font-face {
      font-family: 'Escoredream';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-4Regular.woff') format('woff');
      font-weight: normal;
      font-display: swap;
    }

    @font-face {
      font-family: 'Escoredream';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-5Medium.woff') format('woff');
      font-weight: 500;
      font-display: swap;
    }

    @font-face {
      font-family: 'Escoredream';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-6Bold.woff') format('woff');
      font-weight: 600;
      font-display: swap;
    }

    @font-face {
      font-family: 'Escoredream';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-7ExtraBold.woff') format('woff');
      font-weight: 700;
      font-display: swap;
    }

    @font-face {
      font-family: 'Escoredream';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-8Heavy.woff') format('woff');
      font-weight: 800;
      font-display: swap;
    }

    @font-face {
      font-family: 'Escoredream';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-9Black.woff') format('woff');
      font-weight: 900;
      font-display: swap;
    }
  }

  html, body {
    width: 100%;
    height: 100%;
  }

  body {
    background-color: ${(props: any) => props.theme.colors.background};
    color: ${(props: any) => props.theme.colors.text};
    font-family: 'Escoredream';
    font-weight: 400;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  o, ul, li {
    list-style: none;
  }
`;