import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Trash2, BarChart2, Copy, Check } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const LinkTable = ({ links, onDelete, onRefresh }) => {
  const [copiedId, setCopiedId] = React.useState(null);

  const handleVisit = () => {
    // Wait a bit for the redirect to happen and DB to update
    setTimeout(() => {
      if (onRefresh) onRefresh();
    }, 1000);
  };

  const copyToClipboard = (shortCode) => {
    const url = `${window.location.protocol}//${window.location.host}/${shortCode}`; // Assuming redirect is handled by backend on same domain or configured otherwise. 
    // Actually, for development, backend is on 5000, frontend on 5173. 
    // The redirect URL should point to the backend.
    const backendUrl = `http://localhost:5000/${shortCode}`;
    
    navigator.clipboard.writeText(backendUrl);
    setCopiedId(shortCode);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (links.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <p className="text-gray-500">No links created yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Short Link
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Original URL
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Clicks
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {links.map((link) => (
            <tr key={link._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-indigo-600 truncate max-w-[150px]">
                    {link.shortCode}
                  </span>
                  <button
                    onClick={() => copyToClipboard(link.shortCode)}
                    className="ml-2 text-gray-400 hover:text-gray-600"
                    title="Copy Link"
                  >
                    {copiedId === link.shortCode ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 truncate max-w-xs" title={link.originalUrl}>
                  {link.originalUrl}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {link.clicks}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDistanceToNow(new Date(link.createdAt), { addSuffix: true })}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end space-x-3">
                  <Link
                    to={`/code/${link.shortCode}`}
                    className="text-indigo-600 hover:text-indigo-900"
                    title="View Stats"
                  >
                    <BarChart2 className="h-5 w-5" />
                  </Link>
                  <a
                    href={`http://localhost:5000/${link.shortCode}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-600"
                    title="Visit Link"
                    onClick={handleVisit}
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                  <button
                    onClick={() => onDelete(link.shortCode)}
                    className="text-red-600 hover:text-red-900"
                    title="Delete Link"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LinkTable;
