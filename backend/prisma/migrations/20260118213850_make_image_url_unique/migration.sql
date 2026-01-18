-- CreateTable
CREATE TABLE "Hero" (
    "id" TEXT NOT NULL,
    "real_name" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "origin_description" TEXT NOT NULL,
    "catch_phrase" TEXT NOT NULL DEFAULT 'No catch phrase',

    CONSTRAINT "Hero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Superpower" (
    "id" TEXT NOT NULL,
    "superpower" TEXT NOT NULL,

    CONSTRAINT "Superpower_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "heroId" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_hero_superpower" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Superpower_superpower_key" ON "Superpower"("superpower");

-- CreateIndex
CREATE UNIQUE INDEX "Image_imageUrl_key" ON "Image"("imageUrl");

-- CreateIndex
CREATE UNIQUE INDEX "_hero_superpower_AB_unique" ON "_hero_superpower"("A", "B");

-- CreateIndex
CREATE INDEX "_hero_superpower_B_index" ON "_hero_superpower"("B");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_heroId_fkey" FOREIGN KEY ("heroId") REFERENCES "Hero"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_hero_superpower" ADD CONSTRAINT "_hero_superpower_A_fkey" FOREIGN KEY ("A") REFERENCES "Hero"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_hero_superpower" ADD CONSTRAINT "_hero_superpower_B_fkey" FOREIGN KEY ("B") REFERENCES "Superpower"("id") ON DELETE CASCADE ON UPDATE CASCADE;
