import type { NextApiRequest, NextApiResponse } from 'next'
import * as utils from '@/lib/utils'
import { createResult } from '@/lib/schema'
import { handleErrors } from '@/lib/errors'

type EnrollResponse = {
  success: Boolean
  data: Object[] | Object
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await utils.checkAuth(req, res);
  switch (req.method) {
    case 'POST':
      const { body } = req
      try {
        const inputData = await createResult.parse(body)
        const enrolled = await utils.prisma.result.create({
          data: inputData,
        })
        const response: EnrollResponse = { success: true, data: enrolled }
        res.status(200).json(response)
      } catch (error) {
        console.log(error)
        await handleErrors(error, res)
      }
      break
  }
}
