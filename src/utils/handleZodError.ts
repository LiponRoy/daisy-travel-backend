import { ZodError, ZodIssue } from "zod";

const handleZodError = (err:ZodError):any=>{

    const errorZod = err.issues.map((issue:ZodIssue)=>{

        return issue?.message

    })
    const result = Object.values(errorZod)

    //console.log("errorZod--2 ", result.toString()
    return({
        statusCode:400,
        message:result.toString()
    })

    

}

export default handleZodError