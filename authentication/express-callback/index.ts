import { Request, Response } from "express"

export interface Controller {
  headers: any;
  statusCode: number
  body: any;
}

export interface HttpRequest {
  body: any;
  query: any;
  params: any;
  ip: any;
  method: any;
  path: any;
  headers: any;
}

export default function makeExpressCallback (controller: (httpRequest: HttpRequest) => Promise<Controller>) : (req: Request, res: Response) => Promise<void> {
  return async (req: Request, res: Response) => {
    const httpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      method: req.method,
      path: req.path,
      headers: {
        'Content-Type': req.get('Content-Type'),
        Referer: req.get('referer'),
        'User-Agent': req.get('User-Agent')
      }
    }
    try {
      const httpResponse : Controller = await controller(httpRequest)

      if (httpResponse.headers) {
        res.set(httpResponse.headers)
      }
      res.type('json')
      res.status(httpResponse.statusCode).send(httpResponse.body)

    } catch (error) {
      res.status(500).send({ error: 'An unkown error occurred.' })
    }
  }
}
