import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    *,
    *:before,
    *:after {
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-family: 'Noto Serif', serif;
        scroll-behavior: smooth;
    }
    html,
    body {
        margin: 0;
        padding: 0;
        background-color: #ffd259;
    }
    html {
        font-size: 62.5%;
    }
    body {
        font-size: 1.6rem;
    }
    a {
        text-decoration: none;
    }
`;

export default GlobalStyle;
