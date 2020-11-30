import { IsNumber, IsString, Max, Min } from 'class-validator'

export class Article {
  name: string
  price: number
}

export class ArticleCreateInput {
  @IsString()
  name: string

  @IsNumber()
  @Min(0.01)
  @Max(1000000)
  price: number
}
