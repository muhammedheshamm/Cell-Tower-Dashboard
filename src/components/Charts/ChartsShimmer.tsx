import React from 'react';
import Shimmer from '../Shimmer/Shimmer';
import './Charts.scss';

const ChartsShimmer: React.FC = () => {
  return (
    <div className="charts main-padding">
      <div className="charts__section">
        <Shimmer height={28} width={250} className="mb-2" />
        <Shimmer height={20} width={350} className="mb-3" />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Shimmer height={300} width={400} borderRadius={8} />
        </div>
      </div>

      <div className="charts__section">
        <Shimmer height={28} width={200} className="mb-2" />
        <Shimmer height={20} width={320} className="mb-3" />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Shimmer height={350} width={350} borderRadius="50%" />
        </div>
      </div>
    </div>
  );
};

export default ChartsShimmer;
