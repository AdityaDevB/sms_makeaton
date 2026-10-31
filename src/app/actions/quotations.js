
'use server';

import prisma from '@/lib/prisma';
import { verifySession } from '@/lib/session';

export async function createQuotation(data) {
  try {
    const session = await verifySession();

    if (!session?.userId) {
      return { success: false, error: 'Please log in first.' };
    }

    const admin = await prisma.user.findUnique({
      where: { id: session.userId },
      select: { role: true },
    });

    if (admin?.role !== 'ADMIN') {
      return { success: false, error: 'Only admins can create quotations.' };
    }

    if (
      !data ||
      !data.customerName?.trim() ||
      !data.customerEmail?.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.customerEmail) ||
      !data.planName ||
      !['monthly', 'yearly'].includes(data.billingCycle)
    ) {
      return { success: false, error: 'Please provide valid customer and plan details.' };
    }

    const quantityItems = Array.isArray(data.addons) ? data.addons : [];
    const values = [
      data.planPrice,
      data.subtotal,
      data.discountAmount,
      data.taxAmount,
      data.total,
      data.taxPercentage,
    ];

    if (
      values.some((value) => !Number.isFinite(Number(value)) || Number(value) < 0) ||
      quantityItems.some((item) =>
        !Number.isInteger(Number(item.quantity)) ||
        Number(item.quantity) < 1 ||
        !Number.isFinite(Number(item.price)) ||
        Number(item.price) < 0
      )
    ) {
      return { success: false, error: 'Invalid quotation amounts or quantities.' };
    }

    const result = await prisma.$transaction(async (tx) => {
      const customer = await tx.user.findUnique({
        where: { email: data.customerEmail.trim().toLowerCase() },
        select: { id: true },
      });

      if (!customer) {
        throw new Error(
          'No customer account exists with this email. Create the customer account first.'
        );
      }

      const interval = data.billingCycle === 'yearly' ? 'YEARLY' : 'MONTHLY';

      let plan = await tx.plan.findFirst({
        where: {
          name: data.planName,
          interval,
          price: Number(data.planPrice),
          isActive: true,
        },
      });

      if (!plan) {
        plan = await tx.plan.create({
          data: {
            name: data.planName,
            description: 'Plan created from a Brightloop quotation.',
            price: Number(data.planPrice),
            currency: 'INR',
            interval,
            intervalCount: 1,
          },
        });
      }

      const subscriptionAddons = [];

      for (const item of quantityItems) {
        const slug = `quotation-${String(item.id).toLowerCase().replace(/[^a-z0-9-]/g, '-')}`;

        let addon = await tx.addon.findUnique({ where: { slug } });

        if (!addon) {
          addon = await tx.addon.create({
            data: {
              name: String(item.name).slice(0, 150),
              slug,
              description: 'Add-on added from a Brightloop quotation.',
              price: Number(item.price),
              currency: 'INR',
              interval,
            },
          });
        }

        subscriptionAddons.push({
          addonId: addon.id,
          quantity: Number(item.quantity),
          unitPrice: Number(item.price),
        });
      }

      let taxRateId = null;

      if (Number(data.taxPercentage) > 0) {
        let taxRate = await tx.taxRate.findFirst({
          where: {
            percentage: Number(data.taxPercentage),
            isActive: true,
          },
        });

        if (!taxRate) {
          taxRate = await tx.taxRate.create({
            data: {
              name: `Quotation tax ${Number(data.taxPercentage)}%`,
              percentage: Number(data.taxPercentage),
            },
          });
        }

        taxRateId = taxRate.id;
      }

      const quotation = await tx.subscription.create({
        data: {
          userId: customer.id,
          status: 'QUOTATION',
          currency: 'INR',
          subtotal: Number(data.subtotal),
          discountTotal: Number(data.discountAmount),
          taxTotal: Number(data.taxAmount),
          total: Number(data.total),
          taxRateId,
          items: {
            create: [{
              planId: plan.id,
              description: `${plan.name} (${data.billingCycle})`,
              quantity: 1,
              unitPrice: Number(data.planPrice),
            }],
          },
          addons: {
            create: subscriptionAddons,
          },
        },
      });

      await tx.activityLog.create({
        data: {
          actorId: session.userId,
          action: 'QUOTATION_CREATED',
          entityType: 'Subscription',
          entityId: quotation.id,
          details: {
            quotationNumber: String(data.quotationNumber || ''),
            customerName: String(data.customerName).slice(0, 150),
            companyName: String(data.companyName || '').slice(0, 150),
            customerEmail: String(data.customerEmail).slice(0, 200),
            customerPhone: String(data.customerPhone || '').slice(0, 50),
            customerAddress: String(data.customerAddress || '').slice(0, 1000),
            validityDays: Number(data.validityDays) || 15,
            notes: String(data.notes || '').slice(0, 2000),
            discountType: String(data.discountType || 'percentage'),
            discountValue: Number(data.discountValue) || 0,
            taxPercentage: Number(data.taxPercentage) || 0,
          },
        },
      });

      return quotation.id;
    });

    return { success: true, quotationId: result };
  } catch (error) {
    console.error('Create quotation error:', error);
    return {
      success: false,
      error: error.message || 'Could not save quotation.',
    };
  }
}
