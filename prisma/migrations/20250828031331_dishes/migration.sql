-- CreateTable
CREATE TABLE "public"."Dishes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,

    CONSTRAINT "Dishes_pkey" PRIMARY KEY ("id")
);
