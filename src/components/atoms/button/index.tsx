import { FunctionComponent, MouseEventHandler, PropsWithChildren } from "react";
import styles from "./index.module.css";

interface ButtonProps {
  disabled: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const Button: FunctionComponent<PropsWithChildren<ButtonProps>> = (props) => {
  return (
    <button
      disabled={props.disabled}
      className={`${styles.button}`}
      onClick={(e) => props.onClick(e)}
    >
      {props.children}
    </button>
  );
};

export default Button;
