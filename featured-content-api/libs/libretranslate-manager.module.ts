import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import axios from 'axios';

export interface LibreTranslateManager {
  translate: (jsonOB: string, languageTarget: string) => Promise<any>;
}

class LibreTranslateManagerImpl implements LibreTranslateManager {
  encodeKeysToHex(ob: Object): Object {
    const newOb = {};

    for (const key in ob) {
      if (typeof ob[key] === 'object' && ob[key] !== null) {
        newOb[Buffer.from(key).toString('hex')] = this.encodeKeysToHex(ob[key]);
      } else {
        newOb[Buffer.from(key).toString('hex')] = ob[key];
      }
    }

    return newOb;
  }

  async translateObjectValues(obj, targetLanguage) {
    async function traverse(o) {
      for (const key in o) {
        if (typeof o[key] === 'object' && o[key] !== null) {
          await traverse(o[key]);
        } else {
          if (o[key]) {
            const translation = await translateText(o[key], targetLanguage);
            o[key] = translation;
          }
        }
      }
    }

    async function translateText(text, targetLanguage) {
      let resultText = '';
      try {
        const result = await axios.post(
          `http:///${process.env.TRANSLATION_SERVICE_HOST}:${process.env.TRANSLATION_SERVICE_PORT}/translate`,
          JSON.stringify({
            q: text,
            source: 'auto',
            target: targetLanguage,
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

        return resultText;
      } catch (error) {
        console.error('Error translating text:', error);
        return text;
      }
    }

    await traverse(obj);
    return obj;
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
