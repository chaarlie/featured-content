type FeaturedArticle = {
  title: string;
  originalImage: string | null;
  thumbnail: string | null;
  description: string;
  extract: string;
};

type FeaturedImage = {
  title: string;
  originalImage: string | null;
  thumbnail: string | null;
  description: string;
};

type MostReadArticle = {
  title: string;
  thumbnail: string | null;
};

type MostRead = {
  date: Date | null;
  articles: MostReadArticle[];
};

export interface FeaturedContentResponse {
  readonly id: string;
  featuredArticle: FeaturedArticle;
  featuredImage: FeaturedImage;
  mostRead: MostRead;
}
