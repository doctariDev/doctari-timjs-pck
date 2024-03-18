/* eslint-disable */
import * as yup from 'yup';

export const PauseOptionSchema = yup.object().shape({
    label: yup.string().required(),
    value: yup.number().required(),
});
export type PauseOptions = yup.InferType<typeof PauseOptionSchema>;

export const PauseSchema = yup.object().shape({
    defaultLegalMinimumPause: yup.number().required(),
    requiredPause: yup.number().required(),
    pauseToRender: yup.array().of(PauseOptionSchema).required(),
});
export type Pause = yup.InferType<typeof PauseSchema>;
