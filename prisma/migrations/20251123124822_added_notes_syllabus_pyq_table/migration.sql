-- CreateTable
CREATE TABLE "Syllabus" (
    "id" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "fileSize" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Syllabus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PYQ" (
    "id" TEXT NOT NULL,
    "semester" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "fileSize" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PYQ_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notes" (
    "id" TEXT NOT NULL,
    "semester" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "fileSize" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Syllabus_branch_idx" ON "Syllabus"("branch");

-- CreateIndex
CREATE INDEX "PYQ_branch_idx" ON "PYQ"("branch");

-- CreateIndex
CREATE INDEX "PYQ_semester_idx" ON "PYQ"("semester");

-- CreateIndex
CREATE INDEX "Notes_semester_idx" ON "Notes"("semester");

-- CreateIndex
CREATE INDEX "Notes_branch_idx" ON "Notes"("branch");
