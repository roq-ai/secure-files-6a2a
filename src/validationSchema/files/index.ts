import * as yup from 'yup';

export const fileValidationSchema = yup.object().shape({
  name: yup.string().required(),
  path: yup.string().required(),
  code: yup.string().required(),
  organization_id: yup.string().nullable(),
});
