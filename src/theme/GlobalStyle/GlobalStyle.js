import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    *,
    *:before,
    *:after {
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-family: 'Mountains of Christmas', cursive;
    }
    html,
    body {
        margin: 0;
        padding: 0;
    }
    html {
        font-size: 62.5%;
    }
    body {
        font-size: 1.6rem;
        background: darkcyan;
    }
    a {
        text-decoration: none;
    }
`;

export default GlobalStyle;
