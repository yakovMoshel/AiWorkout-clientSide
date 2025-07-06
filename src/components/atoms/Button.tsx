import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button(props: ButtonProps) {
  return <button {...props}>{props.children}</button>;
}