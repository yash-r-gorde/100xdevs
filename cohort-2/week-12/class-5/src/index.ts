import { PrismaClient } from '../src/generated/prisma'

const prisma = new PrismaClient();

async function insertUser(username: string, password: string, firstName: string, lastName: string, email: string) { 
    const user  = await prisma.user.create({
        data: {
            username,
            password,
            firstName,
            email,
            lastName
        }
    })
    console.log(user)
}

insertUser('yash-r-gorde', '21122003', 'yash', 'gorde', 'yash.gorde@avcoe.org');