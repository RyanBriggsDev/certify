import type { NextApiRequest, NextApiResponse } from "next";
import * as utils from "@/lib/utils";
import { updateCourse } from "@/lib/schema";
import { handleErrors } from "@/lib/errors";

type CourseResponse = {
  success: Boolean;
  data: Object[] | Object;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await utils.checkAuth(req, res);
  const { body, query } = req;

  switch (req.method) {
    case "GET":
      try {
        const courses = await utils.prisma.course.findMany({
          where: {
            id: query.id?.toString(),
            adminId: token?.sub,
          },
        });
        // Need to return candidates so they can be added to a course
        const candidates = await utils.prisma.candidate.findMany({
          where: {
            createdById: token?.sub,
          },
        });
        const response: CourseResponse = { success: true, data: { courses, candidates } };
        res.status(200).json(response);
      } catch (error) {
        await handleErrors(error, res);
      }
      break;

    case "PUT":
      try {
        // Validate user input
        const inputData = await updateCourse.parse(body);
        const updatedCourse = await utils.prisma.course.updateMany({
          where: {
            id: query.id?.toString(),
            adminId: token?.sub,
          },
          data: inputData,
        });
        const response: CourseResponse = { success: true, data: updatedCourse };
        res.status(200).json(response);
      } catch (error) {
        await handleErrors(error, res);
      }
      break;

    case "DELETE":
      try {
        const deletedCourse = await utils.prisma.course.deleteMany({
          where: {
            id: query.id?.toString(),
            adminId: token?.sub,
          },
        });
        const response: CourseResponse = { success: true, data: deletedCourse };
        res.status(200).json(response);
      } catch (error) {
        await handleErrors(error, res);
      }
      break;
  }
}
