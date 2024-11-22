import React from 'react';

// Mock Data
const subscriptions = [
  { id: 1, name: 'Premium Plan', status: 'active' },
  { id: 2, name: 'Basic Plan', status: 'inactive' },
];

const integrations = [
  { id: 1, name: 'Google Analytics', status: 'active' },
  { id: 2, name: 'Salesforce', status: 'inactive' },
];

const Page = () => {
  return (
    <div className="ml-32 mt-12 space-y-10">
      {/* User Subscription Management Page */}
      <div>
        <h1 className="text-2xl font-bold mb-4">User Subscription Management</h1>
        <ul className="space-y-4">
          {subscriptions.map((sub) => (
            <li
              key={sub.id}
              className="flex items-center justify-between border border-gray-300 rounded-md p-4"
            >
              <div>
                <p className="font-semibold">{sub.name}</p>
                <span
                  className={`text-sm px-2 py-1 rounded ${
                    sub.status === 'active'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {sub.status}
                </span>
              </div>
              <div className="flex space-x-2">
                <button className="bg-blue-600 text-white px-3 py-1 rounded-md">
                  Renew
                </button>
                <button className="bg-red-600 text-white px-3 py-1 rounded-md">
                  Cancel
                </button>
              </div>
            </li>
          ))}
        </ul>
        <button className="mt-6 bg-green-600 text-white px-4 py-2 rounded-md">
          Add New Subscription
        </button>
      </div>

      {/* Admin Data Integration Page */}
      <div>
        <h1 className="text-2xl font-bold mb-4">Admin Data Integration</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrations.map((integration) => (
            <div
              key={integration.id}
              className="bg-white border border-gray-300 shadow-md rounded-md p-4"
            >
              <h2 className="font-semibold mb-2">{integration.name}</h2>
              <span
                className={`text-sm px-2 py-1 rounded ${
                  integration.status === 'active'
                    ? 'bg-green-100 text-green-600'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {integration.status}
              </span>
              <div className="mt-4 flex space-x-2">
                <button className="bg-blue-600 text-white px-3 py-1 rounded-md">
                  Update
                </button>
                <button className="bg-red-600 text-white px-3 py-1 rounded-md">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <button className="mt-6 bg-green-600 text-white px-4 py-2 rounded-md">
          Add New Integration
        </button>
      </div>
    </div>
  );
};

export default Page;
