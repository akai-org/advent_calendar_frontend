import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    *,
    *:before,
    *:after {
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-family: Tahoma, Geneva, sans-serif;
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
    }
    a {
        text-decoration: none;
    }
    .navside__active__button {
        & > div {
            background-color: #f4f6fc;
            position: relative;
            &:before {
                content: '';
                background-color: #676C7D;
                left: 0;
                top: 0;
                height: 100%;
                width: 3px;
                position: absolute;
            }
        }
    }
`;

export default GlobalStyle;
