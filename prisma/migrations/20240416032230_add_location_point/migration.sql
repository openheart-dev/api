/*
  Warnings:

  - Added the required column `location_point` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "location_point" geography(POINT,4326) NOT NULL;
