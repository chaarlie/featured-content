import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import axios from 'axios';

export interface ProxyWikimediaRequest {
  getMany: (contentData: string[]) => Promise<any[]>;
}

class ProxyWikimediaRequestImpl implements ProxyWikimediaRequest {
  async getMany(contentData: string[]): Promise<any[]> {
    const REQ_URL = 'https://api.wikimedia.org/feed/v1/wikipedia';

    const promises = await Promise.all(
      contentData.map((url) => {
        return new Promise((resolve, reject) => {
          axios
            .get(`${REQ_URL}/${url}`)
            .then((result) => {
              resolve(result.data);
            })
            .catch(reject);
        });
      }),
    );

    return promises;
  }
}

export const PROXY_WIKIMEDIA_REQ = 'PROXY_WIKIMEDIA_REQ';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    {
      provide: PROXY_WIKIMEDIA_REQ,
      useClass: ProxyWikimediaRequestImpl,
    },
  ],
  exports: [PROXY_WIKIMEDIA_REQ],
})
export class ProxyWikimediaRequestModule {}
