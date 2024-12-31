-- CreateTable
CREATE TABLE "kodepos" (
    "id" SERIAL NOT NULL,
    "kode_pos" TEXT NOT NULL,
    "nama_kelurahan" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "kodepos_pkey" PRIMARY KEY ("id")
);
