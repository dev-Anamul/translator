import * as translateService from '@app/lib';
import { TranslateSchema } from '@app/schemas/translate';
import { asyncHandler } from '@app/utils/async-handler';
import { Request, Response } from 'express';

export const translateHandler = asyncHandler(async (req: Request, res: Response) => {
    // validate request params
    const params = TranslateSchema.safeParse(req.body);

    // if validation fails, return an error
    if (!params.success) {
        return res.status(400).json({ errors: params.error });
    }

    // get ticket by user
    const translatedText = await translateService.translateText(params.data);

    // generate response
    const response = {
        code: 200,
        status: 'success',
        data: translatedText,
    };

    // return response
    return res.status(200).json(response);
});
