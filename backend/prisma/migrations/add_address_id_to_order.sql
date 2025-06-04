-- Create a default address first
INSERT INTO "Address" (id, "userId", street, city, state, "zipCode", country, "createdAt")
VALUES (1, 1, 'Default Street', 'Default City', 'Default State', '00000', 'Default Country', NOW())
ON CONFLICT (id) DO NOTHING;

-- Add addressId column to Order table with default value
ALTER TABLE "Order" ADD COLUMN "addressId" INTEGER NOT NULL DEFAULT 1;

-- Remove the default constraint after setting the values
ALTER TABLE "Order" ALTER COLUMN "addressId" DROP DEFAULT;

-- Add foreign key constraint
ALTER TABLE "Order" ADD CONSTRAINT "Order_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE; 