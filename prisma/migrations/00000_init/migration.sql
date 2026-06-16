-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "stackID" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "displayName" TEXT,
    "profileImageUrl" TEXT,
    "suspendedAt" TIMESTAMP(3),
    "suspendedUntil" TIMESTAMP(3),
    "suspensionReason" TEXT,
    "suspendedBy" TEXT,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Syllabus" (
    "id" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "fileSize" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "semester" TEXT NOT NULL,
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
    "name" TEXT NOT NULL,
    CONSTRAINT "Notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PublicLink" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "semester" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'NOTES',
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "submittedBy" TEXT,
    "submitterEmail" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "adminNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "PublicLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reaction" (
    "id" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Reaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visit" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "referrer" TEXT,
    "userAgent" TEXT,
    "ip" TEXT NOT NULL,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Visit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "performedBy" TEXT NOT NULL,
    "targetUser" TEXT,
    "details" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Readme" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT,
    "githubPath" TEXT,
    "branch" TEXT NOT NULL,
    "semester" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Readme_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "User_stackID_key" ON "User"("stackID");

-- CreateIndex
CREATE INDEX "User_email_key" ON "User"("email");

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

-- CreateIndex
CREATE INDEX "PublicLink_status_idx" ON "PublicLink"("status");

-- CreateIndex
CREATE INDEX "PublicLink_branch_idx" ON "PublicLink"("branch");

-- CreateIndex
CREATE INDEX "PublicLink_semester_idx" ON "PublicLink"("semester");

-- CreateIndex
CREATE Index "PublicLink_submittedBy_idx" ON "PublicLink"("submittedBy");

-- CreateIndex
CREATE INDEX "Message_userId_idx" ON "Message"("userId");

-- CreateIndex
CREATE INDEX "Reaction_messageId_idx" ON "Reaction"("messageId");

-- CreateIndex
CREATE INDEX "Reaction_userId_idx" ON "Reaction"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Reaction_userId_messageId_emoji_key" ON "Reaction"("userId", "messageId", "emoji");

-- CreateIndex
CREATE INDEX "Visit_createdAt_idx" ON "Visit"("createdAt");

-- CreateIndex
CREATE INDEX "Visit_path_idx" ON "Visit"("path");

-- CreateIndex
CREATE INDEX "Visit_userId_idx" ON "Visit"("userId");

-- CreateIndex
CREATE INDEX "Visit_ip_idx" ON "Visit"("ip");

-- CreateIndex
CREATE INDEX "AuditLog_performedBy_idx" ON "AuditLog"("performedBy");

-- CreateIndex
CREATE INDEX "AuditLog_targetUser_idx" ON "AuditLog"("targetUser");

-- CreateIndex
CREATE INDEX "AuditLog_createdAt_idx" ON "AuditLog"("createdAt");

-- CreateIndex
CREATE INDEX "AuditLog_action_idx" ON "AuditLog"("action");

-- CreateIndex
CREATE INDEX "Readme_branch_idx" ON "Readme"("branch");

-- CreateIndex
CREATE INDEX "Readme_semester_idx" ON "Readme"("semester");

-- CreateIndex
CREATE INDEX "Readme_slug_key" ON "Readme"("slug");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_performedBy_fkey" FOREIGN KEY ("performedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_targetUser_fkey" FOREIGN KEY ("targetUser") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;