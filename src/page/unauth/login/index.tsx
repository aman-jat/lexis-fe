import { useFormik } from 'formik'
import { useState } from 'react'
import { Text, View } from 'react-native'
import * as yup from 'yup'
import { auth } from '../../../core/api'
import { Button, Input } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native'

const Login = () => {
  const [loading, setLoading] = useState(false)

  const navigation = useNavigation()

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: yup.object().shape({
      email: yup.string().email('Invalid email format').required('Email is required'),
      password: yup.string().trim().min(4)
    }),
    onSubmit: async ({ email, password }) => {
      try {
        setLoading(true)
        await auth.login({ email, password })
        // navigation.navigate('')
      } catch (e) {
      } finally {
        setLoading(false)
      }
    }
  })

  return (
    <View style={{ flex: 1, paddingHorizontal: 20, justifyContent: 'center' }}>
      <Input
        placeholder="Email"
        onChangeText={formik.handleChange('email')}
        value={formik.values.email}
        errorMessage={formik.touched.email && formik.errors.email}
      />
      <Input
        placeholder="Password"
        onChangeText={formik.handleChange('password')}
        value={formik.values.password}
        errorMessage={formik.touched.password && formik.errors.password}
      />

      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: 'red' }}>{formik.errors.password}</Text>
      )}
      <Button
        buttonStyle={{
          borderRadius: 5
        }}
        containerStyle={{
          alignSelf: 'center',
          marginVertical: 10,
          height: 50,
          width: 200
        }}
        title="Solid"
        type="solid"
        size="lg"
        loading={loading}
        disabled={loading}
        onPress={() => formik.handleSubmit()}
      >
        Login
      </Button>
      <Button
        buttonStyle={{
          borderWidth: 2,
          borderRadius: 5
        }}
        containerStyle={{
          alignSelf: 'center',
          width: 200
        }}
        title="Solid"
        type="outline"
        size="lg"
        disabled={loading}
        onPress={() => navigation.navigate('Register')}
      >
        Register
      </Button>
    </View>
  )
}

export default Login
