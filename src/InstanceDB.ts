import { PrismaClient } from '@prisma/client'

let prisma: any

//check if there is already a connection to the database
if (!(prisma instanceof PrismaClient)) {
    prisma = new PrismaClient()
}

export { prisma };