import React from "react";
import { ButtonProps } from "../../domain/models/types/TButtonProps";


export default function Button(props: ButtonProps) {
  return <button {...props}>{props.children}</button>;
}