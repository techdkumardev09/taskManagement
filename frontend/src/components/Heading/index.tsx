import React from "react";

interface HeadingProps {
  title: string;
  className?: string;
}

const Heading: React.FC<HeadingProps> = ({ title, className }) => {
  return <h1 className={`${className} font-bold text-2xl text-[#01172c]`}>{title}</h1>;
};

export default Heading;
