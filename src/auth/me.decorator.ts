import { ExecutionContext, createParamDecorator } from "@nestjs/common"

export const Me = createParamDecorator((data: any, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest()

  return request.user
})
