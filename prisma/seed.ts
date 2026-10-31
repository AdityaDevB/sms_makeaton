
import prisma from '../src/lib/prisma.js'
import {
  products,
  plans,
  addons,
} from '../src/lib/catalog'

async function main() {
  console.log('Starting Brightloop database seed...')

  // 1. Create or update products
  const productRecords = new Map<string, string>()

  for (const product of products) {
    const savedProduct = await prisma.product.upsert({
      where: {
        slug: product.slug,
      },
      update: {
        name: product.name,
        description: product.summary,
        isActive: true,
      },
      create: {
        name: product.name,
        slug: product.slug,
        description: product.summary,
        isActive: true,
      },
    })

    productRecords.set(product.slug, savedProduct.id)
    console.log(`Product ready: ${product.name}`)
  }

  // 2. Create or update plans
  for (const plan of plans) {
    await prisma.plan.upsert({
      where: {
        id: plan.id,
      },
      update: {
        name: plan.name,
        description: plan.tagline,
        price: plan.monthly,
        currency: 'INR',
        interval: 'MONTHLY',
        intervalCount: 1,
        isActive: true,
      },
      create: {
        id: plan.id,
        name: plan.name,
        description: plan.tagline,
        price: plan.monthly,
        currency: 'INR',
        interval: 'MONTHLY',
        intervalCount: 1,
        isActive: true,
      },
    })

    console.log(`Plan ready: ${plan.name}`)

    // 3. Connect each plan to its included products
    for (const productSlug of plan.productSlugs) {
      const productId = productRecords.get(productSlug)

      if (!productId) {
        throw new Error(
          `Product "${productSlug}" was not found while seeding "${plan.name}".`
        )
      }

      await prisma.planProduct.upsert({
        where: {
          planId_productId: {
            planId: plan.id,
            productId,
          },
        },
        update: {},
        create: {
          planId: plan.id,
          productId,
        },
      })
    }
  }

  // 4. Create or update add-ons
  for (const addon of addons) {
    await prisma.addon.upsert({
      where: {
        slug: addon.id,
      },
      update: {
        name: addon.name,
        description: addon.note,
        price: addon.monthly,
        currency: 'INR',
        interval: 'MONTHLY',
        isActive: true,
      },
      create: {
        name: addon.name,
        slug: addon.id,
        description: addon.note,
        price: addon.monthly,
        currency: 'INR',
        interval: 'MONTHLY',
        isActive: true,
      },
    })

    console.log(`Add-on ready: ${addon.name}`)
  }

  console.log('Brightloop database seed completed successfully!')
}

main()
  .catch((error) => {
    console.error('Database seeding failed:', error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
