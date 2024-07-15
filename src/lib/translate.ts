import { TranslateType } from '@app/schemas/translate';
import { AppError } from '@app/utils/app-error';
import translate from 'translate-google-api';

export const translateText = async (input: TranslateType) => {
    try {
        return await translate(input.text, { to: input.targetLanguage });
    } catch (error) {
        console.log('Error while translating text: ', error);
        throw new AppError('Error while translating text', 500);
    }
};
