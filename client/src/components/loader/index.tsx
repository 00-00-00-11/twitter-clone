import * as React from "react";
import { createPortal } from "react-dom";
import { ClipLoader } from "react-spinners";
import { LoaderContainer } from "./styles";

interface Props {
  fullScreen?: boolean;
  size?: number;
}

const element: Element | null = document.querySelector("#loader");

const Loader: React.FC<Props> = ({ size, fullScreen }) => {
  return createPortal(
    <LoaderContainer fullScreen={fullScreen}>
      <ClipLoader color="#fff" size={size}  />
    </LoaderContainer>,
    element!,
  );
};

export default Loader;
