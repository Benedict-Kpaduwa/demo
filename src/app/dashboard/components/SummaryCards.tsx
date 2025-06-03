import { formatCurrency } from "@/lib/utils";

interface SummaryCardsProps {
  totalBalance: number;
  totalUsers: number;
}

export default function SummaryCards({
  totalBalance,
  totalUsers,
}: SummaryCardsProps) {
  const cards = [
    {
      title: "Total Balance",
      value: formatCurrency(totalBalance),
      change: "+12.5%",
      trend: "up",
    },
    {
      title: "Total Users",
      value: totalUsers,
      change: "+5.2%",
      trend: "up",
    },
    {
      title: "Transactions",
      value: "1,248",
      change: "-2.4%",
      trend: "down",
    },
    {
      title: "Active Accounts",
      value: "842",
      change: "+3.1%",
      trend: "up",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">{card.title}</h3>
          <p className="mt-2 text-2xl font-semibold text-gray-900">
            {card.value}
          </p>
          <div
            className={`mt-2 flex items-center text-sm ${
              card.trend === "up" ? "text-green-600" : "text-red-600"
            }`}
          >
            {card.trend === "up" ? (
              <svg
                className="h-4 w-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M12 7a1 1 0 01-1 1H9v1h2a1 1 0 110 2H9v1h2a1 1 0 110 2H9v1a1 1 0 11-2 0v-1H5a1 1 0 110-2h2v-1H5a1 1 0 110-2h2V8H5a1 1 0 010-2h2V5a1 1 0 112 0v1h2a1 1 0 011 1z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className="h-4 w-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            <span>{card.change}</span>
            <span className="ml-1 text-gray-500">vs last month</span>
          </div>
        </div>
      ))}
    </div>
  );
}
