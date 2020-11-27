import styled, { css } from "styled-components";

export const LoaderContainer = styled.div<{ fullScreen?: boolean }>`
  ${(props) =>
    props.fullScreen &&
    css`
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: grid;
      place-items: center;
      z-index: 100;
      background: var(--primary);
    `}
`;
