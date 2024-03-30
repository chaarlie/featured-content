export type FeaturedArticle =  {
    title: string
    originalImage: string | null
    thumbnail: string | null
    description: string
    extract: string
}

export type FeaturedImage =  {
    title: string
    originalImage: string | null
    thumbnail: string | null
    description: string
}

export type MostReadArticle = {
    title: string
    thumbnail: string | null
}

export type MostRead =  {
    date: Date | null
    articles: MostReadArticle[]
}

export interface FeaturedContent {
    readonly id: string
    featuredArticle: FeaturedArticle
    featuredImage: FeaturedImage
    mostRead: MostRead

}