CREATE TABLE `productImages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`category` enum('doors','windows','flooring','siding') NOT NULL,
	`productId` varchar(64) NOT NULL,
	`productName` varchar(255) NOT NULL,
	`storageKey` varchar(512) NOT NULL,
	`imageUrl` text NOT NULL,
	`mimeType` varchar(64) DEFAULT 'image/jpeg',
	`fileSize` int,
	`uploadedBy` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `productImages_id` PRIMARY KEY(`id`)
);
