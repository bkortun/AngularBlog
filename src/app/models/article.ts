import { Category } from "./category"

export class Article{
  id:number
  title:string
  contentSummary:string
  contentMain:string
  picture:string
  publishDate:Date
  viewCount:number
  commentCount:number
  category:Category
}
