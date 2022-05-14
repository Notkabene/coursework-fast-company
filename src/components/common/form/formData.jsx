import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import TextField from './textField'
import { validator } from '../../../utils/validator'
import api from '../../../api'
import SelectField from './selectField'
import RadioField from './radioField'
import MultiSelectField from './multiSelectField'
import CheckboxField from './checkboxField'

const FormData = ({ nameForm, nameButton, userId, buttonLinkTo }) => {
  const [data, setData] = useState({
    email: '',
    name: '',
    password: '',
    profession: '',
    sex: 'male',
    qualities: [],
    licence: false
  })

  const [errors, setErrors] = useState({})
  const [qualities, setQualities] = useState([])
  const [professions, setProfession] = useState([])
  const [user, setUser] = useState()

  useEffect(() => {
    api.professions.fetchAll().then((data) => {
      const professionsList = Object.keys(data).map((professionName) => ({
        label: data[professionName].name,
        value: data[professionName]._id
      }))
      setProfession(professionsList)
    })

    api.qualities.fetchAll().then((data) => {
      const qualitiesList = Object.keys(data).map((optionName) => ({
        label: data[optionName].name,
        value: data[optionName]._id,
        color: data[optionName].color
      }))
      setQualities(qualitiesList)
    })

    api.users.getById(userId).then((data) => setUser(data))
  }, [])

  useEffect(() => {
    if (user) {
      const userPassword = user.password ? user.password : ''
      const userQualities = Object.keys(user.qualities).map((optionName) => ({
        label: user.qualities[optionName].name,
        value: user.qualities[optionName]._id,
        color: user.qualities[optionName].color
      }))

      setData({
        email: `${user.email}`,
        name: `${user.name}`,
        password: `${userPassword}`,
        profession: `${user.profession._id}`,
        sex: `${user.sex}`,
        qualities: userQualities,
        licence: true
      })
    }
  }, [user])

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }

  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Email обязателен для заполнения'
      },
      isEmail: {
        message: 'Email введен не корректно'
      }
    },
    name: {
      isRequired: {
        message: 'Имя обязательно для заполнения'
      }
    },
    password: {
      isRequired: {
        message: 'Пароль обязателен для заполнения'
      },
      isCapitalSymbol: {
        message: 'Пароль должен содержать хотя бы одну заглавную букву'
      },
      isContainDigit: {
        message: 'Пароль должен содержать хотя бы одну цифру'
      },
      min: {
        message: 'Пароль должен состоять минимум из 8 символов',
        value: 8
      }
    },
    profession: {
      isRequired: {
        message: 'Обязательно выберите Вашу профессию'
      }
    },
    licence: {
      isRequired: {
        message:
          'Вы не можете использовать наш сервис без утверждения лицензионного соглашения'
      }
    }
  }

  useEffect(() => {
    validate()
  }, [data])

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const isValid = Object.keys(errors).length === 0

  const getProfessionById = (id) => {
    for (const prof of professions) {
      if (prof.value === id) {
        return { _id: prof.value, name: prof.label }
      }
    }
  }
  const getQualities = (elements) => {
    const qualitiesArray = []
    for (const elem of elements) {
      for (const quality in qualities) {
        if (elem.value === qualities[quality].value) {
          qualitiesArray.push({
            _id: qualities[quality].value,
            name: qualities[quality].label,
            color: qualities[quality].color
          })
        }
      }
    }
    return qualitiesArray
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    const { profession, qualities } = data
    api.users.update(userId, {
      ...data,
      profession: getProfessionById(profession),
      qualities: getQualities(qualities)
    })
  }

  return (
    <>
      <h3 className="mb-4">{nameForm}</h3>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Имя"
          name="name"
          value={data.name}
          onChange={handleChange}
          error={errors.name}
        />

        <TextField
          label="Email"
          name="email"
          value={data.email}
          onChange={handleChange}
          error={errors.email}
        />

        {user ? (
          ''
        ) : (
          <TextField
            label="Пароль"
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            error={errors.password}
          />
        )}

        <SelectField
          label="Выберите Вашу профессию"
          value={data.profession}
          onChange={handleChange}
          error={errors.profession}
          options={professions}
          defaultOption="Выберите профессию..."
          name="profession"
        />

        <RadioField
          label="Выберите Ваш пол"
          options={[
            { name: 'Male', value: 'male' },
            { name: 'Female', value: 'female' },
            { name: 'Other', value: 'other' }
          ]}
          name="sex"
          onChange={handleChange}
          value={data.sex}
        />

        <MultiSelectField
          value={data.qualities}
          label="Выберите Ваши качества"
          onChange={handleChange}
          options={qualities}
          name="qualities"
          defaultValue={data.qualities}
        />

        <CheckboxField
          value={data.licence}
          onChange={handleChange}
          name="licence"
          error={errors.licence}
        >
          Подтвердить <a>лицензионное соглашение</a>
        </CheckboxField>
        <button
          className="btn btn-secondary w-100 mx-auto"
          disabled={!isValid}
          type="submit"
          // onClick={goLinkTo}
        >
          {nameButton}
        </button>
      </form>
    </>
  )
}

export default FormData

FormData.propTypes = {
  nameForm: PropTypes.string,
  nameButton: PropTypes.string,
  buttonLinkTo: PropTypes.string,
  userId: PropTypes.string
}
