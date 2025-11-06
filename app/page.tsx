import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Welcome to Expense Tracker</h1>
        <p className="mt-4 text-lg">
          Track your spending, visualize your habits.
        </p>
        <Link
          href="/dashboard"
          className="mt-8 inline-block px-6 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700"
        >
          Get Started
        </Link> {/* <-- Correct closing tag */}
      </div>
    </main>
  );
}