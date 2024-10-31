// src/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --primary: #24ce8f;
    --background: black;
    --nav-background: #141318;
    --nav-item-bg-hover: #79797920;
    --navbar-height: 4rem;
    --text-gray: #252525;
    --text-white: white;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Poppins', sans-serif;
    background: var(--background);
  }
`;