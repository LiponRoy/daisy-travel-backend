import { ZodError, ZodIssue } from "zod";

const handleZodError = (err: ZodError): any => {
  const errorZod: any = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });
  //const result = Object.values(errorZod)
  const pth=errorZod.map((v: any) => v.path)
  const message=errorZod.map((v: any) => v.message)

  //console.log("errorZod--2 ", result.toString()
  return {
    statusCode: message,
    message: message,
  };
};

export default handleZodError;
