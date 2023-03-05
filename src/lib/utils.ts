import { PrismaClient } from '@prisma/client'
import { getToken } from 'next-auth/jwt'
import type { NextApiRequest, NextApiResponse } from 'next'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prismaClient =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prismaClient

export const prisma = new PrismaClient()

export const checkAuth = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  try {
    const token = await getToken({ req: request })
    if (token) {
      // Signed in so return token
      return token
    } else {
      throw new Error()
    }
  } catch (error) {
    // Not Signed in so send 401
    response.status(401).json({ error: 'Not authorised to access' })
  }
}

export const filterProfile = async (profile) => {
  delete profile.password
  return profile
}
