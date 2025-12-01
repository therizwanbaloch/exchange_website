import React, { useEffect, useState } from 'react';
import DataCard from './DataCard';
import { FaUsers, FaExchangeAlt, FaMoneyBillWave, FaCoins } from 'react-icons/fa';
import axios from 'axios';

const DataSection = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token'); // admin token
        const res = await axios.get(`${URL}/admin/stats`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [URL]);

  // Loading skeleton with icons
  if (loading)
    return (
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 mr-4 ml-0'>
        {[FaUsers, FaExchangeAlt, FaMoneyBillWave, FaCoins].map((Icon, idx) => (
          <div
            key={idx}
            className="h-32 rounded-lg bg-gray-200 animate-pulse flex flex-col items-center justify-center"
          >
            <Icon className="text-gray-400 text-4xl mb-4" />
            <div className="h-6 w-20 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 w-24 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    );

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 mr-4 ml-0'>
      <DataCard
        number={stats?.totalUsers || 0}
        text="Total Users"
        bgColor="bg-sky-500"
        Icon={FaUsers}
      />
      <DataCard
        number={stats?.totalTransactions || 0}
        text="Transactions"
        bgColor="bg-green-500"
        Icon={FaExchangeAlt}
      />
      <DataCard
        number={stats?.totalDeposits || 0}
        text="Total Deposits"
        bgColor="bg-yellow-500"
        Icon={FaMoneyBillWave}
      />
      <DataCard
        number={stats?.totalWithdraws || 0}
        text="Total Withdraws"
        bgColor="bg-red-500"
        Icon={FaCoins}
      />
    </div>
  );
};

export default DataSection;
