
'use server';

import { verifySession } from '@/lib/session';
import prisma from '@/lib/prisma';

export async function getHeaderUser() {
  try {
    const session = await verifySession();

    if (!session?.userId) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: { id: String(session.userId) },
      select: {
        name: true,
        role: true,
      },
    });

    if (!user) return null;

    return {
      name: user.name,
      role: user.role,
    };
  } catch (error) {
    console.error('Header user check failed:', error);
    return null;
  }
}
