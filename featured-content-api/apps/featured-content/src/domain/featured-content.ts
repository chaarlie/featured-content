import { AggregateRoot } from '@nestjs/cqrs';

export type ContentData = { id: string } & Partial<{
  tfa: any;
  mostread: any;
  image: any;
}>;

export type FeaturedArticleProperties = {
  title: string;
  originalImage: URL | null;
  thumbnail: URL | null;
  description: string;
  extract: string;
};

export type FeaturedImageProperties = {
  title: string;
  originalImage: URL | null;
  thumbnail: URL | null;
  description: string;
};

export type MostReadArticleProperties = {
  title: string;
  thumbnail: URL | null;
};

export type MostReadProperties = {
  date: Date | null;
  articles: MostReadArticleProperties[];
};

export type FeaturedContentEssentialProperties = Required<
  Readonly<{
    id: string;
  }>
>;

export type FeaturedContentStandardProperties = Partial<{
  featuredArticle: FeaturedArticleProperties;
  featuredImage: FeaturedImageProperties;
  mostRead: MostReadProperties;
}>;

export type FeaturedContentProperties = FeaturedContentEssentialProperties &
  FeaturedContentStandardProperties;

export interface FeaturedContent {}

export class FeaturedContentImpl
  extends AggregateRoot
  implements FeaturedContent
{
  private readonly id: string;
  private featuredArticle: FeaturedArticleProperties;
  private featuredImage: FeaturedImageProperties;
  private mostRead: MostReadProperties;

  constructor(properties?: FeaturedContentProperties, data?: ContentData) {
    super();

    if (properties) {
      Object.assign(this, properties);
    }

    if (data) {
      this.id = data.id;

      if ('tfa' in data) {
        this.featuredArticle = Object.entries(data.tfa).reduce(
          (container, [key, val]) => {
            if (key in container) {
              container[key] = val;
            }
            return container;
          },
          {} as FeaturedArticleProperties,
        );

        this.featuredArticle.title = this.parseFeaturedArticleTitle(data.tfa);
        this.featuredArticle.originalImage =
          this.parseFeaturedArticleOriginalImage(data.tfa);
        this.featuredArticle.thumbnail = this.parseFeaturedArticleThumbnail(
          data.tfa,
        );
        this.featuredArticle.extract = this.parseFeaturedArticleExtract(
          data.tfa,
        );
        this.featuredArticle.description = this.parseFeaturedArticleDescription(
          data.tfa,
        );
      }

      if ('mostread' in data) {
        this.mostRead = {} as MostReadProperties;

        this.mostRead.date = this.parseMostReadDate(data.mostread);
        this.mostRead.articles = this.parseMostReadArticles(data.mostread);
      }

      if ('image' in data) {
        this.featuredImage = Object.entries(data.image).reduce(
          (container, [key, val]) => {
            if (key in container) {
              container[key] = val;
            }
            return container;
          },
          {} as FeaturedImageProperties,
        );

        this.featuredImage.title = this.parseFeaturedImageTitle(data.image);
        this.featuredImage.thumbnail = this.parseFeaturedImageThumbnail(
          data.image,
        );
        this.featuredImage.originalImage = this.parseFeaturedImageOriginalImage(
          data.image,
        );
        this.featuredImage.description = this.parseFeaturedImageDescription(
          data.image,
        );
      }
    }
  }

  private parseFeaturedArticleTitle(ob: any): string {
    return ob?.titles?.normalized;
  }

  private parseFeaturedArticleOriginalImage(ob: any) {
    const source = ob?.originalimage?.source;
    return source ? new URL(source) : null;
  }

  private parseFeaturedArticleThumbnail(ob: any) {
    const source = ob?.thumbnail?.source;
    return source ? new URL(source) : null;
  }

  private parseFeaturedArticleDescription(ob: any) {
    return ob?.description;
  }

  private parseFeaturedArticleExtract(ob: any) {
    return ob?.extract;
  }

  private parseMostReadArticles(ob: any) {
    if (!Array.isArray(ob?.articles)) return [];

    return ob?.articles?.map(
      ({ titles, thumbnail }) =>
        ({
          title: titles.normalized,
          thumbnail: thumbnail ? thumbnail.source : '',
        }) as MostReadArticleProperties,
    );
  }

  private parseMostReadDate(ob: any) {
    const date = ob?.date;
    return date ? new Date(date) : null;
  }

  private parseFeaturedImageTitle(ob: any) {
    return ob?.titles?.normalized;
  }

  private parseFeaturedImageThumbnail(ob: any) {
    const source = ob?.thumbnail?.source;
    return source ? new URL(source) : null;
  }

  private parseFeaturedImageOriginalImage(ob: any) {
    const source = ob?.image?.source!;
    return source ? new URL(source) : null;
  }

  private parseFeaturedImageDescription(ob: any) {
    return ob?.description?.text;
  }
}
