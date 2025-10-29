import React from 'react';
import EfficientDiv from './EfficientDiv';
import SponserDiv from './SponserDiv';

const SponserArea = () => {
  return (
    <section id='sponser' className="bg-white w-full py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* EfficientDiv*/}
          <div className="lg:col-span-2 flex items-center justify-center">
            <EfficientDiv />
          </div>

          {/* SponserDiv  */}
          <div className="lg:col-span-3 flex items-center justify-center">
            <SponserDiv />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SponserArea;
