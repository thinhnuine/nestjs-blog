/*
  Warnings:

  - You are about to drop the column `isPublished` on the `blog` table. All the data in the column will be lost.
  - You are about to drop the column `create_at` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `blog` DROP COLUMN `isPublished`,
    ADD COLUMN `is_publised_at` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `create_at`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `deleted_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
