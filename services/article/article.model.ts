import { IsString } from 'class-validator'

export class Article {
  @IsString()
  name: string
}
