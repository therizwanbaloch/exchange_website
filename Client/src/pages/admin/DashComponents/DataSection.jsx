import React from 'react';
import DataCard from './DataCard';
import { FaUsers, FaExchangeAlt, FaMoneyBillWave, FaCoins } from 'react-icons/fa';

const DataSection = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 mr-4 ml-0'>
      <DataCard
        number={12345}
        text="Total Users"
        bgColor="bg-sky-500"
        Icon={FaUsers}
      />
      <DataCard
        number={12356}
        text="Transactions"
        bgColor="bg-green-500"
        Icon={FaExchangeAlt}
      />
      <DataCard
        number={1266}
        text="Total Deposits"
        bgColor="bg-yellow-500"
        Icon={FaMoneyBillWave}
      />
      <DataCard
        number={1266}
        text="Total Withdraws"
        bgColor="bg-red-500"
        Icon={FaCoins}
      />
    </div>
  );
};

export default DataSection;
