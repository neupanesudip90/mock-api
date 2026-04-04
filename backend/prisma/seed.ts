import { PrismaClient } from "../src/generated/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcrypt";
import crypto from "crypto";
import "dotenv/config";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

// Helper to hash password
const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

// Helper to generate API key
const generateApiKey = (): {
  plainKey: string;
  keyHash: string;
  keyPrefix: string;
} => {
  const plainKey = `mock_${crypto.randomBytes(32).toString("hex")}`;
  const keyHash = bcrypt.hashSync(plainKey, 10);
  const keyPrefix = plainKey.slice(0, 12);
  return { plainKey, keyHash, keyPrefix };
};

async function main() {
  console.log("🌱 Starting seed...");

  // 1. Create User
  console.log("👤 Creating user...");
  const user = await prisma.user.upsert({
    where: { email: "developer@example.com" },
    update: {},
    create: {
      email: "developer@example.com",
      password: await hashPassword("password123"),
      name: "Test Developer",
    },
  });
  console.log(`✅ User created: ${user.email}`);

  // 2. Create Project
  console.log("📦 Creating project...");
  const project = await prisma.project.upsert({
    where: { id: "project-seed-001" },
    update: {},
    create: {
      id: "project-seed-001",
      userId: user.id,
      name: "E-Commerce Mock API",
      description: "Mock API for e-commerce frontend development",
      defaultRateLimitMax: 100,
      defaultRateLimitWindow: 60,
      defaultRateLimitStrategy: "FIXED_WINDOW",
      apiKeyHash: "seed-placeholder-hash", // add this
      apiKeyPrefix: "seed-place", // add this
    },
  });
  console.log(`✅ Project created: ${project.name}`);
  console.log(`🔑 Project ID: ${project.id}`);

  // 3. Create API Key
  console.log("🔑 Creating API key...");
  const { plainKey, keyHash, keyPrefix } = generateApiKey();

  await prisma.apiKey.upsert({
    where: { id: "apikey-seed-001" },
    update: {},
    create: {
      id: "apikey-seed-001",
      projectId: project.id,
      name: "Development Key",
      keyHash,
      keyPrefix,
    },
  });
  console.log(`✅ API Key created`);
  console.log(`⚠️  Save this key (shown only once): ${plainKey}`);

  // 4. Create Endpoints
  console.log("🔌 Creating endpoints...");

  // Endpoint 1: GET /users
  await prisma.endpoint.upsert({
    where: {
      projectId_method_path: {
        projectId: project.id,
        method: "GET",
        path: "/users",
      },
    },
    update: {},
    create: {
      projectId: project.id,
      path: "/users",
      method: "GET",
      responseSchema: {
        users: [
          {
            id: "{{random.uuid}}",
            name: "{{name.firstName}} {{name.lastName}}",
            email: "{{internet.email}}",
            avatar: "{{image.avatar}}",
            role: '{{helpers.arrayElement(["admin", "user", "moderator"])}}',
          },
          {
            id: "{{random.uuid}}",
            name: "{{name.firstName}} {{name.lastName}}",
            email: "{{internet.email}}",
            avatar: "{{image.avatar}}",
            role: '{{helpers.arrayElement(["admin", "user", "moderator"])}}',
          },
        ],
        total: 2,
        page: 1,
      },
      statusCode: 200,
      delayMs: 100,
      rateLimitEnabled: true,
      rateLimitStrategy: "FIXED_WINDOW",
      rateLimitMax: 60,
      rateLimitWindow: 60,
    },
  });
  console.log("✅ Endpoint: GET /users");

  // Endpoint 2: GET /users/:id
  await prisma.endpoint.upsert({
    where: {
      projectId_method_path: {
        projectId: project.id,
        method: "GET",
        path: "/users/:id",
      },
    },
    update: {},
    create: {
      projectId: project.id,
      path: "/users/:id",
      method: "GET",
      responseSchema: {
        id: "{{params.id}}",
        name: "{{name.firstName}} {{name.lastName}}",
        email: "{{internet.email}}",
        bio: "{{lorem.sentence}}",
        joinedAt: "{{date.past}}",
        stats: {
          posts: "{{random.numeric(3)}}",
          followers: "{{random.numeric(4)}}",
        },
      },
      statusCode: 200,
      delayMs: 50,
      rateLimitEnabled: true,
      rateLimitStrategy: "FIXED_WINDOW",
      rateLimitMax: 100,
      rateLimitWindow: 60,
    },
  });
  console.log("✅ Endpoint: GET /users/:id");

  // Endpoint 3: POST /users
  await prisma.endpoint.upsert({
    where: {
      projectId_method_path: {
        projectId: project.id,
        method: "POST",
        path: "/users",
      },
    },
    update: {},
    create: {
      projectId: project.id,
      path: "/users",
      method: "POST",
      responseSchema: {
        id: "{{random.uuid}}",
        message: "User created successfully",
        user: {
          id: "{{random.uuid}}",
          name: "{{name.firstName}} {{name.lastName}}",
          email: "{{internet.email}}",
          createdAt: "{{date.recent}}",
        },
      },
      statusCode: 201,
      delayMs: 150,
      rateLimitEnabled: true,
      rateLimitStrategy: "FIXED_WINDOW",
      rateLimitMax: 30,
      rateLimitWindow: 60,
    },
  });
  console.log("✅ Endpoint: POST /users");

  // Endpoint 4: GET /products
  await prisma.endpoint.upsert({
    where: {
      projectId_method_path: {
        projectId: project.id,
        method: "GET",
        path: "/products",
      },
    },
    update: {},
    create: {
      projectId: project.id,
      path: "/products",
      method: "GET",
      responseSchema: {
        products: [
          {
            id: "{{random.uuid}}",
            name: "{{commerce.productName}}",
            price: "{{commerce.price}}",
            description: "{{commerce.productDescription}}",
            category: "{{commerce.department}}",
            image: "{{image.business}}",
            inStock: "{{datatype.boolean}}",
          },
          {
            id: "{{random.uuid}}",
            name: "{{commerce.productName}}",
            price: "{{commerce.price}}",
            description: "{{commerce.productDescription}}",
            category: "{{commerce.department}}",
            image: "{{image.business}}",
            inStock: "{{datatype.boolean}}",
          },
        ],
        total: 2,
      },
      statusCode: 200,
      delayMs: 80,
      rateLimitEnabled: true,
      rateLimitStrategy: "FIXED_WINDOW",
      rateLimitMax: 120,
      rateLimitWindow: 60,
    },
  });
  console.log("✅ Endpoint: GET /products");

  // Endpoint 5: DELETE /users/:id
  await prisma.endpoint.upsert({
    where: {
      projectId_method_path: {
        projectId: project.id,
        method: "DELETE",
        path: "/users/:id",
      },
    },
    update: {},
    create: {
      projectId: project.id,
      path: "/users/:id",
      method: "DELETE",
      responseSchema: {
        success: true,
        message: "User {{params.id}} deleted successfully",
      },
      statusCode: 200,
      delayMs: 50,
      rateLimitEnabled: true,
      rateLimitStrategy: "FIXED_WINDOW",
      rateLimitMax: 20,
      rateLimitWindow: 60,
    },
  });
  console.log("✅ Endpoint: DELETE /users/:id");

  console.log("\n🎉 Seed completed successfully!");
  console.log("=".repeat(50));
  console.log("📋 Test Credentials:");
  console.log(`   Email: developer@example.com`);
  console.log(`   Password: password123`);
  console.log("=".repeat(50));
  console.log("🔑 API Key (save this!):");
  console.log(`   ${plainKey}`);
  console.log("=".repeat(50));
  console.log("🧪 Test your mock API:");
  console.log(`   curl http://localhost:3000/mock/${project.id}/users`);
  console.log(`   curl http://localhost:3000/mock/${project.id}/users/123`);
  console.log(`   curl http://localhost:3000/mock/${project.id}/products`);
  console.log("=".repeat(50));
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
