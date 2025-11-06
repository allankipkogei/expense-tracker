"use client";

import { useState } from "react";
import SignOutButton from "@/components/SignOutButton";
import ExpenseForm from "@/components/ExpenseForm";
import ExpensesList from "@/components/ExpensesList";

export default function DashboardPageClient() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Hi, Allan!</h1>
        <SignOutButton />
      </div>

      <div className="mt-12 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add a New Expense</h2>
        <ExpenseForm onAdd={() => setRefreshKey((k) => k + 1)} />
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Your Expenses</h2>
        <ExpensesList refreshKey={refreshKey} />
      </div>
    </div>
  );
}
