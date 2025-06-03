"use client";

import { useEffect, useCallback } from "react";
import SummaryCards from "./components/SummaryCards";
import TransactionTable from "./components/TransactionTable";
import RecentActivity from "./components/RecentActivity";
import { useWebSocket } from "@/app/hooks/useWebSocket";
import { useTransactions } from "@/app/hooks/useTransactions";

export default function DashboardPage() {
  const {
    transactions,
    addTransaction,
    summary,
    fetchTransactions,
    fetchSummary,
    isLoading,
  } = useTransactions();

  useEffect(() => {
    fetchTransactions();
    fetchSummary();
  }, [fetchTransactions, fetchSummary]);

  const handleNewTransaction = useCallback(
    (newTransaction) => {
      addTransaction(newTransaction);
    },
    [addTransaction]
  );

  const { error: webSocketError } = useWebSocket(handleNewTransaction);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-600 lg:hidden">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
          </div>
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
              JD
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8">
          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg shadow p-6 h-32 animate-pulse"
                >
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <SummaryCards
              totalBalance={summary?.totalBalance}
              totalUsers={summary?.totalUsers}
            />
          )}
        </div>

        {/* Data Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Transactions Table (2/3 width) */}
          <div className="bg-white rounded-lg shadow overflow-hidden lg:col-span-2">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">
                Recent Transactions
              </h2>
              <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                View All
              </button>
            </div>
            {isLoading ? (
              <div className="p-6 space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                  </div>
                ))}
              </div>
            ) : (
              <TransactionTable transactions={transactions.slice(0, 5)} />
            )}
          </div>

          {/* Recent Activity (1/3 width) */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                Recent Activity
              </h2>
            </div>
            <RecentActivity transactions={transactions.slice(0, 5)} />
          </div>
        </div>

        {/* Analytics Section */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">
              Monthly Analytics
            </h2>
            <div className="relative">
              <select className="appearance-none bg-gray-50 border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-sm">
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>This year</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="p-6 h-80 flex items-center justify-center text-gray-500">
            Analytics chart will appear here
          </div>
        </div>
      </main>
    </div>
  );
}
