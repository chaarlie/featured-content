const { createHash } = require('crypto');
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetJsonTranslatedQuery } from './get-json-translated.query';

import axios from 'axios';
import { TranslationImpl } from '../domain/translation';

@QueryHandler(GetJsonTranslatedQuery)
export class GetJsonTranslatedQueryHandler implements IQueryHandler {
  private async libreTranslateApiCall(q, target) {
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

  private async translateObjectValues(ob, languageTarget) {
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

  async execute(query: GetJsonTranslatedQuery): Promise<TranslationImpl> {
    const translatedOb = await this.translateObjectValues(
      query.jsonOb,
      query.languageTarget,
    );

    return new TranslationImpl({ jsonOb: translatedOb });
  }
}
