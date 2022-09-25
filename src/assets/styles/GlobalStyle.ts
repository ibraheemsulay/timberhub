import { createGlobalStyle } from "styled-components";
import { IStyle } from "../ts-types/styleTypes";

const GlobalStyle = createGlobalStyle<IStyle>`

*, *:before, *:after {
    box-sizing: border-box;
    margin: 0;
    padding: 0; 
}

body {
  font-size: 16px;
  font-family: 'Mukta Mahee', sans-serif;
  background: #fff;
}

h1 {
  font-size: 1.2rem;
}

@media (min-width: 576px) {
  h1 {
    font-size: 2.0625rem;
  }
}
`;

export default GlobalStyle;
