import type { NextApiRequest, NextApiResponse } from "next";
import * as utils from "@/lib/utils";
import { createCourse } from "@/lib/schema";
import { handleErrors } from "@/lib/errors";

type CourseResponse = {
  success: Boolean;
  data: Object[] | Object;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await utils.checkAuth(req, res);

  switch (req.method) {
    case "GET":
      try {
        const courses = await utils.prisma.course.findMany({
          where: {
            adminId: token?.sub,
          },
        });
        const response: CourseResponse = { success: true, data: courses };
        res.status(200).json(response);
      } catch (error) {
        await handleErrors(error, res);
      }
      break;

    case "POST":
      const { body } = req;
      try {
        const inputData = await createCourse.parse({ ...body, adminId: token?.sub });
        const course = await utils.prisma.course.create({
          data: inputData,
        });
        const response: CourseResponse = { success: true, data: course };
        res.status(200).json(response);
      } catch (error) {
        await handleErrors(error, res);
      }
      break;
  }
}
