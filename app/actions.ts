"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export async function addExpense(formData: FormData) {
  // 1. Get current user session
  const session = await getServerSession(authOptions);
  
  // --- THE FIX IS HERE ---
  // We cast 'user' to 'any' to tell TypeScript it's okay to access '.id'
  const user = session?.user as any;

  if (!session || !user?.id) {
    throw new Error("You must be logged in to add an expense.");
  }
  const userId = user.id;
  // -----------------------

  // 2. Get data from the form
  const description = formData.get("description") as string;
  const amount = parseFloat(formData.get("amount") as string);
  const category = formData.get("category") as string;

  // 3. Simple validation
  if (!description || !amount || !category) {
    throw new Error("Please fill in all fields.");
  }
  if (isNaN(amount) || amount <= 0) {
    throw new Error("Please enter a valid amount.");
  }

  // 4. Create the expense in the database
  try {
    await prisma.expense.create({
      data: {
        description: description,
        amount: amount,
        category: category,
        date: new Date(), // We'll just use the current date for simplicity
        userId: userId,
      },
    });

    // 5. Revalidate the dashboard page to show the new expense
    revalidatePath("/dashboard");

  } catch (error) {
    console.error("Error adding expense:", error);
    throw new Error("Failed to add expense.");
  }
}