import React, { useReducer } from 'react'
import ApiManager from '../modules/ApiManager'
import { Link } from 'react-router-dom'
import Logo from '../../images/logo.png'
import Cassette from '../../images/cassette.png'
import './Auth.css'

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'setField':
      return {
        ...state,
        [action.field]: action.value,
      }
    default:
      return state
  }
}

export const CreateAccount = ({ setUser, history }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const { firstName, lastName, email, password, confirmPassword } = state
  const user = { firstName, lastName, email, password }

  const userEmailExists = users =>
    users && users.find(user => user.email.toLowerCase() === state.email.toLowerCase())

  const userPasswordMismatch = password !== confirmPassword
  const allFieldsValid = email && password && confirmPassword
  const userEmailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)

  const alertValidationErrors = async () => {
    const users = await ApiManager.getAll('users')

    if (userEmailExists(users)) alert('This email is already taken')

    if (userPasswordMismatch) alert('Your passwords do not match')

    if (!allFieldsValid) alert('Please fill out all fields')

    if (!userEmailValid) alert('Please enter a valid email address')
  }

  const createUserAndRedirectHome = async () => {
    const results = await ApiManager.createNew('users', user)
    await setUser(results)
    await history.push('/')
  }

  const onClickCreateNewUser = event => {
    event.preventDefault()

    alertValidationErrors()

    createUserAndRedirectHome()
  }

  const onFieldChange = (event, fieldType) => {
    const value = event && event.target && event.target.value
    dispatch({ type: 'setField', field: fieldType, value })
  }

  return (
    <>
      <img src={Logo} alt={'dtty logo'} className="smallLogo" />
      <form className="userAuthForm">
        <fieldset className="userAuthForm" id="signup">
          <h3>Sign Up:</h3>
          <div className="formgrid">
            <input
              onChange={e => onFieldChange(e, 'firstName')}
              type="name"
              className="createAccountInput"
              id="firstName"
              placeholder="First name"
              required=""
            />
            <input
              onChange={e => onFieldChange(e, 'lastName')}
              type="name"
              className="createAccountInput"
              id="lastName"
              placeholder="Last name"
              required=""
            />
            <input
              onChange={e => onFieldChange(e, 'email')}
              type="email"
              className="createAccountInput"
              id="email"
              placeholder="Email address"
              required=""
            />
            <input
              onChange={e => onFieldChange(e, 'password')}
              type="password"
              className="createAccountInput"
              id="password"
              placeholder="Password"
              required=""
            />
            <input
              onChange={e => onFieldChange(e, 'confirmPassword')}
              type="password"
              className="createAccountInput"
              id="confirmPassword"
              placeholder="Confirm password"
              required=""
            />
          </div>
          <button onClick={onClickCreateNewUser} type="submit" className="button" id="signupButton">
            Register
          </button>
          <Link className="smallLink" to="/login">
            I already have an account
          </Link>
          <picture>
            <img src={Cassette} alt="cassette tape drawing" id="cassetteImage" />
          </picture>
        </fieldset>
      </form>
    </>
  )
}
