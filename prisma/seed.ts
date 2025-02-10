import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      { 
        userId: "john-doe",
        userName: "John Doe", 
        email: "john@example.com",
        password: "hashedpassword123", // You should hash this in production
        links: [],
        isVerified: true
      },
      { 
        userId: "jane-doe",
        userName: "Jane Doe", 
        email: "jane@example.com",
        password: "hashedpassword123", // You should hash this in production
        links: [],
        isVerified: true
      },
    ],
  });
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());