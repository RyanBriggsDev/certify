// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import * as utils from "@/lib/utils";
import { createAdmin } from "@/lib/schema";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "POST") {
    try {
      const { body } = req;
      // Create an Admin from request body
      const buildAdmin = await createAdmin.parse(body);
      // Encrypted thepassword
      const salt = await bcrypt.genSalt(10);
      buildAdmin.password = await bcrypt.hash(buildAdmin.password, salt);
      // Save the new admin to database
      const admin = await utils.prisma.admin.create({
        data: { email: buildAdmin.email, password: buildAdmin.password },
      });
      // Send response back
      res.status(200).json({ success: "Admin Created", data: admin });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(500).json({
          error: {
            field: error.issues[0].path[0],
            message: error.issues[0].message,
          },
        });
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          res.status(500).json({
            error: `There is a unique constraint violation on field [${error.meta.target}]. Please use a unique value.`,
          });
        } else {
          res.status(500).json({
            error: "Unknown database error",
          });
        }
      } else {
        // For generic errors, log to console and send a 500 response back
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
      }
    }
  }
}
