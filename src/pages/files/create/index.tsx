import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createFile } from 'apiSdk/files';
import { Error } from 'components/error';
import { fileValidationSchema } from 'validationSchema/files';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { OrganizationInterface } from 'interfaces/organization';
import { getOrganizations } from 'apiSdk/organizations';
import { FileInterface } from 'interfaces/file';

function FileCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: FileInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createFile(values);
      resetForm();
      router.push('/files');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<FileInterface>({
    initialValues: {
      name: '',
      path: '',
      code: '',
      organization_id: (router.query.organization_id as string) ?? null,
    },
    validationSchema: fileValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create File
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="name" mb="4" isInvalid={!!formik.errors?.name}>
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" value={formik.values?.name} onChange={formik.handleChange} />
            {formik.errors.name && <FormErrorMessage>{formik.errors?.name}</FormErrorMessage>}
          </FormControl>
          <FormControl id="path" mb="4" isInvalid={!!formik.errors?.path}>
            <FormLabel>Path</FormLabel>
            <Input type="text" name="path" value={formik.values?.path} onChange={formik.handleChange} />
            {formik.errors.path && <FormErrorMessage>{formik.errors?.path}</FormErrorMessage>}
          </FormControl>
          <FormControl id="code" mb="4" isInvalid={!!formik.errors?.code}>
            <FormLabel>Code</FormLabel>
            <Input type="text" name="code" value={formik.values?.code} onChange={formik.handleChange} />
            {formik.errors.code && <FormErrorMessage>{formik.errors?.code}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<OrganizationInterface>
            formik={formik}
            name={'organization_id'}
            label={'Select Organization'}
            placeholder={'Select Organization'}
            fetcher={getOrganizations}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'file',
  operation: AccessOperationEnum.CREATE,
})(FileCreatePage);
