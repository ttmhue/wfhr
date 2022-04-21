-- CreateTable
CREATE TABLE `Action` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(45) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Permission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permission_has_action` (
    `permission_id` INTEGER NOT NULL,
    `action_id` INTEGER NOT NULL,

    INDEX `fk_permission_has_action_action1_idx`(`action_id`),
    INDEX `fk_permission_has_action_permission1_idx`(`permission_id`),
    PRIMARY KEY (`permission_id`, `action_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Report` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(45) NULL,
    `task_today` VARCHAR(300) NULL,
    `task_tomorrow` VARCHAR(300) NULL,
    `created_date` DATE NULL,
    `issue` VARCHAR(45) NULL,
    `report_date` DATE NULL,
    `created_by` INTEGER NOT NULL,
    `is_on_leave` TINYINT NULL,

    INDEX `fk_report_user1_idx`(`created_by`),
    PRIMARY KEY (`id`, `created_by`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Request` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reason` VARCHAR(45) NULL,
    `is_allday` BOOLEAN NULL,
    `created_date` DATE NULL,
    `requested_date` DATE NULL,
    `status` TINYINT NULL,
    `created_by` INTEGER NOT NULL,

    INDEX `fk_request_user_idx`(`created_by`),
    PRIMARY KEY (`id`, `created_by`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NULL,
    `code` VARCHAR(10) NULL,
    `last_modify_on` DATE NULL,
    `last_modify_by` VARCHAR(45) NULL,
    `is_active` TINYINT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role_has_permission` (
    `role_id` INTEGER NOT NULL,
    `permission_id` INTEGER NOT NULL,

    INDEX `fk_role_has_permission_permission1_idx`(`permission_id`),
    INDEX `fk_role_has_permission_role1_idx`(`role_id`),
    PRIMARY KEY (`role_id`, `permission_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Team` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(45) NULL,
    `no_of_member` INTEGER NULL,
    `leader` VARCHAR(45) NULL,
    `is_active` TINYINT NULL,
    `created_at` DATE NULL,
    `updated_at` DATE NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(45) NULL,
    `name` VARCHAR(45) NULL,
    `code` VARCHAR(45) NULL,
    `is_active` TINYINT NULL,
    `starting_date` DATE NULL,
    `updated_at` DATE NULL,
    `role_id` INTEGER NOT NULL,

    UNIQUE INDEX `User_id_key`(`id`),
    INDEX `fk_user_role1_idx`(`role_id`),
    PRIMARY KEY (`id`, `role_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_team` (
    `user_id` INTEGER NOT NULL,
    `team_id` INTEGER NOT NULL,

    INDEX `fk_user_team_team1_idx`(`team_id`),
    INDEX `fk_user_team_user1_idx`(`user_id`),
    PRIMARY KEY (`user_id`, `team_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `permission_has_action` ADD CONSTRAINT `fk_permission_has_action_action1` FOREIGN KEY (`action_id`) REFERENCES `Action`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `permission_has_action` ADD CONSTRAINT `fk_permission_has_action_permission1` FOREIGN KEY (`permission_id`) REFERENCES `Permission`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Report` ADD CONSTRAINT `fk_report_user1` FOREIGN KEY (`created_by`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Request` ADD CONSTRAINT `fk_request_user` FOREIGN KEY (`created_by`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `role_has_permission` ADD CONSTRAINT `fk_role_has_permission_permission1` FOREIGN KEY (`permission_id`) REFERENCES `Permission`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `role_has_permission` ADD CONSTRAINT `fk_role_has_permission_role1` FOREIGN KEY (`role_id`) REFERENCES `Role`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `fk_user_role1` FOREIGN KEY (`role_id`) REFERENCES `Role`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_team` ADD CONSTRAINT `fk_user_team_team1_idx` FOREIGN KEY (`team_id`) REFERENCES `Team`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_team` ADD CONSTRAINT `fk_user_team_user1_idx` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
