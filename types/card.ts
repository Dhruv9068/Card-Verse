export interface Reaction {
  emoji: string
  count: number
}

export interface Card {
  id: string
  title: string
  description: string
  imageUrl: string
  category: string
  reactions: Reaction[]
  addedAt?: number
}
