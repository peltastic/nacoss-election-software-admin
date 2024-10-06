import React from "react";

type Props = {
  label: string;
  type?: string
  placeholder: string;
  value: string;
  className: string;
  changed: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = (props: Props) => {
  return (
    <div className="">
      <label className="block mb-2 text-left">{props.label}</label>
      <input
        placeholder={props.placeholder}
        value={props.placeholder}
        onChange={props.changed}
        type={props.type || "text"}
        className={`${props.className}`}
      />
    </div>
  );
};

export default Input;
