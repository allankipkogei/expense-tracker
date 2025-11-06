"use client";

import { useState, useEffect } from "react";

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
}

interface ExpensesListProps {
  refreshKey?: number; // optional key to trigger refresh
}

export default function ExpensesList({ refreshKey }: ExpensesListProps) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchExpenses() {
    setLoading(true);
    try {
      const res = await fetch("/api/expenses");
      if (!res.ok) {
        console.error("Failed to fetch expenses", res.statusText);
        setExpenses([]);
      } else {
        const data = await res.json();
        setExpenses(data);
      }
    } catch (error) {
      console.error("Error fetching expenses", error);
      setExpenses([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchExpenses();
  }, [refreshKey]); // refresh if refreshKey changes

  if (loading) return <p>Loading expenses...</p>;
  if (!expenses.length) return <p className="text-gray-500">No expenses yet.</p>;

  return (
    <ul className="space-y-3">
      {expenses.map((expense) => (
        <li
          key={expense.id}
          className="border rounded-lg p-4 flex justify-between items-center shadow-sm"
        >
          <div>
            <p className="font-medium">{expense.description}</p>
            <p className="text-sm text-gray-500">{expense.category}</p>
          </div>
          <p className="font-semibold text-green-600">Ksh {expense.amount}</p>
        </li>
      ))}
    </ul>
  );
}
