
import { redirect } from 'next/navigation';
import { verifySession } from '@/lib/session';
import prisma from '@/lib/prisma';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await verifySession();

  if (!session?.userId) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId as string },
    select: { role: true },
  });

  if (!user || user.role !== 'ADMIN') {
    redirect('/customer/dashboard');
  }

  return <>{children}</>;
}
