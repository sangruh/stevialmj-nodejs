-- MySQL Database Schema for Stevia LMJ
-- Run this in phpMyAdmin or Plesk Database Manager

-- Create users table
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `openId` VARCHAR(255) NOT NULL UNIQUE,
  `name` VARCHAR(255) DEFAULT NULL,
  `email` VARCHAR(255) DEFAULT NULL,
  `loginMethod` VARCHAR(100) DEFAULT NULL,
  `role` VARCHAR(50) DEFAULT 'user' NOT NULL,
  `createdAt` VARCHAR(50) NOT NULL,
  `updatedAt` VARCHAR(50) NOT NULL,
  `lastSignedIn` VARCHAR(50) NOT NULL,
  INDEX `idx_openid` (`openId`),
  INDEX `idx_role` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create articles table
CREATE TABLE IF NOT EXISTS `articles` (
  `id` VARCHAR(255) PRIMARY KEY,
  `title` TEXT NOT NULL,
  `excerpt` TEXT NOT NULL,
  `content` LONGTEXT NOT NULL,
  `author` VARCHAR(255) NOT NULL,
  `date` VARCHAR(100) NOT NULL,
  `image` VARCHAR(500) NOT NULL,
  `readTime` INT NOT NULL,
  `category` VARCHAR(100) DEFAULT 'Tips Kesehatan' NOT NULL,
  `tags` TEXT DEFAULT NULL,
  `createdAt` VARCHAR(50) NOT NULL,
  `updatedAt` VARCHAR(50) NOT NULL,
  INDEX `idx_category` (`category`),
  INDEX `idx_created_at` (`createdAt`),
  FULLTEXT INDEX `idx_title` (`title`(255)),
  FULLTEXT INDEX `idx_content` (`content`(500))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default admin user (optional - update openId with your actual openId after first login)
-- INSERT INTO users (openId, name, email, loginMethod, role, createdAt, updatedAt, lastSignedIn)
-- VALUES ('your-openid-here', 'Admin', 'sangruhdev@gmail.com', 'password', 'admin', NOW(), NOW(), NOW());
