import { css } from "emotion";

export const shellStylePopupBackground = css`
  position: fixed;
  min-height: 100px;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 200;
  background-color: hsla(0, 0%, 0%, 0.4);
  padding: 16px;

  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

export const shellStylePopupCard = css`
  margin: 16px auto 16px;
  text-align: left;
  background-color: white;
  padding: 16px 16px 32px 16px;
  width: 100%;
  max-width: 600px;
`;
