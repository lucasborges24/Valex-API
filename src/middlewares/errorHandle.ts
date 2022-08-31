import { Request, Response, NextFunction, ErrorRequestHandler } from "express"

const errorHandler: ErrorRequestHandler = async (error, req: Request, res: Response, next: NextFunction) => {   
    if (error.type === 'Unprocessable_Entity') {
        return res.status(422).send(error.message)
    } else if (error.type === 'Not_Found') {
        return res.status(404).send(error.message)
    } 

    return res.status(500).send(error?.message)
}

export default errorHandler