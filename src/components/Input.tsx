import React from "react";

type Props = {
  label: string;
  type?: string;
  name?: string;
  placeholder: string;
  value: string;
  className: string;
  changed: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
};

const Input = (props: Props) => {
  return (
    <div className="">
      <label className="block mb-2 text-left">{props.label}</label>
      <input
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.changed}
        type={props.type || "text"}
        className={`${props.className}`}
        onBlur={props.onBlur}
      />
    </div>
  );
};

export default Input;
