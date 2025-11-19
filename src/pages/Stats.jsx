import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import StatsCard from '../components/StatsCard';
import { MousePointer, Clock, Calendar, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';

const Stats = () => {
  const { code } = useParams();
  const [link, setLink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get(`/links/${code}`);
        setLink(response.data);
      } catch (err) {
        setError('Failed to fetch stats');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [code]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error || !link) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Error</h2>
        <p className="mt-2 text-gray-500">{error || 'Link not found'}</p>
        <Link to="/" className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-500">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-gray-400 hover:text-gray-500">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            Stats for <span className="text-indigo-600">/{link.shortCode}</span>
          </h1>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Link Details</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-gray-500">Original URL</dt>
            <dd className="mt-1 text-sm text-gray-900 break-all">{link.originalUrl}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Short Link</dt>
            <dd className="mt-1 text-sm text-indigo-600">
              {window.location.protocol}//{window.location.host}/{link.shortCode}
            </dd>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <StatsCard
          title="Total Clicks"
          value={link.clicks}
          icon={MousePointer}
          color="indigo"
        />
        <StatsCard
          title="Last Clicked"
          value={link.lastClickedAt ? format(new Date(link.lastClickedAt), 'PPpp') : 'Never'}
          icon={Clock}
          color="green"
        />
        <StatsCard
          title="Created At"
          value={format(new Date(link.createdAt), 'PPpp')}
          icon={Calendar}
          color="blue"
        />
      </div>
    </div>
  );
};

export default Stats;
