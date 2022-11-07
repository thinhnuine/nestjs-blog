import { ExtractJwt, Strategy } from "passport-jwt"
import { PassportStrategy } from "@nestjs/passport"
import { Injectable } from "@nestjs/common"
import { jwt } from "../constants"
import { Role } from "@prisma/client"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwt.secretKey,
    })
  }

  async validate(payload: { sub: string; email: string; role: Role }) {
    return { id: payload.sub, email: payload.email, role: payload.role }
  }
}
