import { prisma } from "@repo/db";
import { Hono } from "hono";
import { handle } from "hono/vercel";

export const runtime = "nodejs";

const app = new Hono().basePath("/api");

app
  .get("/hello", async (c) => {
    const test = await prisma.user.findMany();
    return c.json({
      test,
    });
  })
  .patch(async (c) => {
    const name = await c.req.json();
    const test = await prisma.user.update({
      where: {
        id: "123",
      },
      data: {
        name: name.name,
      },
    });
    return c.json({
      test,
    });
  })
  .delete(async (c) => {
    const test = await prisma.user.delete({
      where: {
        id: "2",
      },
    });
    return c.json({
      test,
    });
  })
  .post(async (c) => {
    const body = await c.req.json();
    console.log(body);
    const test = await prisma.user.create({
      data: body,
    });
    return c.json({
      test,
    });
  });

app.get("/health", async (c) => {
  return c.json({
    message: "i am alive",
    status: 200,
  });
});

const GET = handle(app);
const POST = handle(app);
const PATCH = handle(app);
const DELETE = handle(app);

export { GET, PATCH, POST, DELETE };
