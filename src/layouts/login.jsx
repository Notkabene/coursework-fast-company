import React, { useState } from 'react'
import { useParams } from 'react-router'
import LoginForm from '../components/ui/loginForm'
import FormData from '../components/common/form/formData'

const Login = () => {
  const { type } = useParams()
  const [formType, setFormType] = useState(type === 'register' ? type : 'login')

  const toggleFormType = () => {
    setFormType(prevState => prevState === 'register' ? 'login' : 'register')
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {formType === 'register'
            ? <>
                <FormData
                  nameForm='Регистрация'
                  nameButton='Зарегистрироваться'
                />
                <p>
                  Alrady have account? <a className='link-primary' role='button' onClick={toggleFormType}>Sign In</a>
                </p>
            </>
            : <>
                <LoginForm />
                <p>
                  Dont have account? <a className='link-primary' role='button' onClick={toggleFormType}>Register</a>
                </p>
              </>
          }
        </div>
      </div>
    </div>
  )
}

export default Login
