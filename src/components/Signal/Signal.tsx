import React from "react";
import "./Signal.scss";

interface SignalProps {
  strength: number; // 1-5
  size?: "small" | "medium" | "large";
  className?: string;
}

const Signal: React.FC<SignalProps> = ({
  strength,
  size = "medium",
  className = "",
}) => {
  const bars = Array.from({ length: 5 }, (_, i) => (
    <rect
      key={i}
      x={i * 4 + i * 1} // 4px width + 1px gap
      y={20 - (i + 1) * 3} // Start from bottom, each bar 3px shorter
      width="4"
      height={(i + 1) * 3}
      rx="1"
      className={i < strength ? "signal-bar active" : "signal-bar inactive"}
    />
  ));

  return (
    <div className={`signal-component signal--${size} ${className}`}>
      <svg viewBox="0 0 24 20" width="24" height="20" className="signal-svg">
        {bars}
      </svg>
    </div>
  );
};

export default Signal;
