CREATE TABLE `analyticsEvents` (
	`id` varchar(64) NOT NULL,
	`eventType` enum('quote_request','contact_form','phone_call','page_view') NOT NULL,
	`eventName` varchar(255) NOT NULL,
	`productName` varchar(255),
	`userEmail` varchar(320),
	`userPhone` varchar(20),
	`pageUrl` text,
	`referrer` text,
	`userAgent` text,
	`ipAddress` varchar(45),
	`metadata` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `analyticsEvents_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `analyticsMetrics` (
	`id` varchar(64) NOT NULL,
	`date` varchar(10) NOT NULL,
	`totalVisitors` int DEFAULT 0,
	`pageViews` int DEFAULT 0,
	`bounceRate` int DEFAULT 0,
	`avgSessionDuration` int DEFAULT 0,
	`quoteRequests` int DEFAULT 0,
	`contactFormSubmissions` int DEFAULT 0,
	`phoneCallsTracked` int DEFAULT 0,
	`topPage` varchar(512),
	`topTrafficSource` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `analyticsMetrics_id` PRIMARY KEY(`id`)
);
