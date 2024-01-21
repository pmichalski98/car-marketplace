CREATE TABLE IF NOT EXISTS "carOffer" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" serial NOT NULL,
	"createdAt" date DEFAULT now() NOT NULL,
	"updatedAt" date,
	"title" varchar(256) NOT NULL,
	"description" text NOT NULL,
	"mileage" integer NOT NULL,
	"transmission" varchar(20) NOT NULL,
	"manufacturer" varchar(50) NOT NULL,
	"fuelType" varchar(20) NOT NULL,
	"prodYear" integer NOT NULL,
	"color" varchar(50) NOT NULL,
	"price" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "images" (
	"id" uuid PRIMARY KEY NOT NULL,
	"userId" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL
);
