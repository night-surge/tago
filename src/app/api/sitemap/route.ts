import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    const users = await prisma.user.findMany({
        select: {
            userName: true
        }
    });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.mytago.tech";
    
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    users.forEach(user => {
        xml += `<url>\n<loc>${baseUrl}/${user.userName}</loc>\n</url>\n`;
    });

    xml += `</urlset>`;

    return new Response(xml, {
        headers: { "Content-Type": "application/xml" },
    });
}
