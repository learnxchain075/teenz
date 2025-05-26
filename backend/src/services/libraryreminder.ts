import { prisma } from "../db/prisma";
import cron from "node-cron";

// reminders.js

export const sendOverdueReminders = async () => {
  const overdueIssues = await prisma.bookIssue.findMany({
    where: {
      returnDate: null,
      dueDate: { lt: new Date() },
    },
    include: { user: true, bookCopy: { include: { book: true } } },
  });

  overdueIssues.forEach((issue: { user: { email: any }; bookCopy: { book: { title: any } } }) => {
    console.log(`Reminder: User ${issue.user.email} has overdue book ${issue.bookCopy.book.title}`);
    // Implement email/notification logic here
  });
};


cron.schedule("0 0 * * *", sendOverdueReminders);

