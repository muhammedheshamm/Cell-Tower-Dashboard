import React from 'react';
import './Card.scss';

interface CardProps {
  title: string;
  content: string | number;
  icon: React.ReactNode;
  color?: 'primary' | 'success' | 'secondary';
  delay?: number;
}

const Card: React.FC<CardProps> = ({ title, content, icon, color = 'primary', delay = 0 }) => {
  return (
    <div 
      className={`card card--${color}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="card__icon">
        {icon}
      </div>
      <div className="card__content">
        <h3 className="card__title">{title}</h3>
        <p className="card__value">{content}</p>
      </div>
    </div>
  );
};

export default Card; 