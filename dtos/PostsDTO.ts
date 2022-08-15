
interface PostsDTO {
  count: number,
  next: string,
  previous: string,
  results: Array<Post>,
  error: string,
  status: string
}
