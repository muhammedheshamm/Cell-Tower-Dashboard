import React from "react";

export const highlightText = (text: string, searchTerm: string) => {
  if (!searchTerm.trim()) {
    return text;
  }

  const regex = new RegExp(`(${searchTerm})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (regex.test(part)) {
      return React.createElement(
        "mark",
        { key: index, className: "highlight" },
        part
      );
    }
    return part;
  });
};
