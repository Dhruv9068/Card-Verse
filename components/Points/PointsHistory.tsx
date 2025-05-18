"use client"

import "./PointsHistory.css"

interface PointsTransaction {
  id: string
  amount: number
  description: string
  timestamp: number
}

interface PointsHistoryProps {
  transactions: PointsTransaction[]
}

export default function PointsHistory({ transactions }: PointsHistoryProps) {
  // Sort transactions by timestamp (newest first)
  const sortedTransactions = [...transactions].sort((a, b) => b.timestamp - a.timestamp)

  return (
    <div className="points-history">
      {sortedTransactions.length > 0 ? (
        <div className="transactions-list">
          {sortedTransactions.map((transaction) => (
            <div key={transaction.id} className="transaction-item">
              <div className="transaction-info">
                <div className="transaction-description">{transaction.description}</div>
                <div className="transaction-time">
                  {new Date(transaction.timestamp).toLocaleDateString()} at{" "}
                  {new Date(transaction.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
              <div className={`transaction-amount ${transaction.amount >= 0 ? "positive" : "negative"}`}>
                {transaction.amount >= 0 ? "+" : ""}
                {transaction.amount}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-transactions">
          <p>No points transactions yet.</p>
        </div>
      )}
    </div>
  )
}
