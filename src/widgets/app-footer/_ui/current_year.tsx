"use client";
import { useEffect, useState } from "react";

export const CurrentYear = () => {
  const [year, setYeat] = useState(new Date().getFullYear());

  useEffect(() => {
    setYeat(new Date().getFullYear());
  }, []);
  return <span>{`© ${year}`}</span>;
};
