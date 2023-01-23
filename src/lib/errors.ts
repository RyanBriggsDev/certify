import { ZodError } from "zod";
import { Prisma } from "@prisma/client";

export const handleErrors = async (error, res) => {
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
        error: `There is a unique constraint violation on field [${error?.meta?.target}]. Please use a unique value.`,
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
};
