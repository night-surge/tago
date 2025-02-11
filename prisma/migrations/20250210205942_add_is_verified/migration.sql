-- CreateTable
CREATE TABLE "users" (
    "uid" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "links" TEXT[],
    "profilePicture" TEXT NOT NULL DEFAULT 'https://ia801307.us.archive.org/1/items/instagram-plain-round/instagram%20dip%20in%20hair.jpg',
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_userId_key" ON "users"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_userId_idx" ON "users"("userId");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");
