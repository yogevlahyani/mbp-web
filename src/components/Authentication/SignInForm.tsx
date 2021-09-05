import React from 'react'
import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Stack,
} from '@chakra-ui/react'
import * as Yup from 'yup'
import { Field, Form, Formik } from 'formik'

const SigninSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(4, 'Password is too short')
    .max(50, 'Password is too long')
    .required('Required'),
})

interface Props {
  onFormSubmit: (email: string, password: string) => void | Promise<void>
}

export const SignInForm = ({ onFormSubmit }: Props) => {
  const onSubmit = async ({ email, password }: any, actions: any) => {
    await onFormSubmit(email, password)
    actions.setSubmitting(false)
  }

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={SigninSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Stack spacing={4}>
            <Field name="email">
              {({ field, form }: any) => (
                <FormControl
                  isRequired
                  isInvalid={form.errors.email && form.touched.email}
                >
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    placeholder="Enter Your Email Address"
                  />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="password">
              {({ field, form }: any) => (
                <FormControl
                  isRequired
                  isInvalid={form.errors.password && form.touched.password}
                >
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    placeholder="Enter Password"
                  />
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Stack spacing={10}>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                isLoading={isSubmitting}
                textTransform="uppercase"
                type="submit"
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Form>
      )}
    </Formik>
  )
}
