import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import axios from 'axios';

export interface LibreTranslateManager {
  translate: (jsonOB: string, languageTarget: string) => Promise<any>;
}

class LibreTranslateManagerImpl implements LibreTranslateManager {
  async libreTranslateApiCall(q, target) {
    let resultText = '';

    try {
      const result = await axios.post(
        `http:///${process.env.TRANSLATION_SERVICE_HOST}:${process.env.TRANSLATION_SERVICE_PORT}/translate`,
        JSON.stringify({
          q,
          source: 'en',
          target,
          format: 'text',
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (result.data && 'translatedText' in result.data) {
        resultText = result.data['translatedText'];
      }
    } catch (error) {
      console.error('Error translating text:', error);
    }

    return resultText;
  }

  async translateObjectValues(ob, languageTarget) {
    const obCopy = Object.assign({}, ob);

    for (const key in obCopy) {
      let currentEl = obCopy[key];
      if (typeof currentEl === 'string' && currentEl.length) {
        currentEl = await this.libreTranslateApiCall(currentEl, languageTarget);
      }

      if (typeof currentEl === 'object' && currentEl !== null) {
        if (Array.isArray(currentEl)) {
          currentEl = await Promise.all(
            currentEl.map((el) =>
              this.translateObjectValues(el, languageTarget),
            ),
          );
        } else {
          currentEl = await this.translateObjectValues(
            currentEl,
            languageTarget,
          );
        }
      }

      obCopy[key] = currentEl;
    }
    return obCopy;
  }

  async translate(jsonOb: string, languageTarget: string): Promise<any> {
    const ob = JSON.parse(jsonOb);

    const translatedOb = await this.translateObjectValues(ob, languageTarget);

    return translatedOb;
  }
}

export const LIBRE_TRANSLATE_MANAGER = 'LIBRE_TRANSLATE_MANAGER';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    {
      provide: LIBRE_TRANSLATE_MANAGER,
      useClass: LibreTranslateManagerImpl,
    },
  ],
  exports: [LIBRE_TRANSLATE_MANAGER],
})
export class LibreTranslateManagerModule {}
