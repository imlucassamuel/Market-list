import { createGlobalStyle, DefaultTheme } from 'styled-components';

export default createGlobalStyle<{ theme: DefaultTheme }>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Sora', sans-serif;
  }

  body {
    background: ${({ theme }) => theme.colors.background};
    font-size: 16px;
    color: ${({ theme }) => theme.colors.primary.main}
  }

  buttton {
    cursor: pointer;
  }
`;
