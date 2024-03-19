/* eslint-disable */
import * as yup from 'yup';

export declare enum JobType {
    Regeldienst = "Regeldienst",
    RufdienstAktiv = "Rufdienst aktiv",
    RufdienstPassiv = "Rufdienst passiv",
}

const timestampSchema = yup.object().shape({
    time: yup.string().matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format. Use 24-hour format HH:MM').required('Time is required'),
    date: yup.string().matches(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format. Use YYYY-MM-DD').required('Date is required'),
});

export const timeReportSchema = yup.object().shape({
    jobType: yup.mixed().oneOf(Object.values(JobType)).required('Valid job-type is required'),
    date: yup.string().matches(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format. Use YYYY-MM-DD').required('Date is required'),
    from: timestampSchema.required('Start timestamp is required'),
    to: timestampSchema.required('End timestamp is required'),
    pause: yup.number().positive('Pause time must be a positive number').required('Pause time is required'),
});

export type TimeReport = yup.InferType<typeof timeReportSchema>;
