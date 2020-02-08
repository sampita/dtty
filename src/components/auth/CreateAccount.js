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

// The reason this is a traditional function declaration, is purely for organizational reasons
// Since `function` ignores block scope and allows this `reducer` to be "hoisted" and used even before it was declared.
// Keeping it at the bottom of the file tends to keep things tidier for me, but this could very easily be an arrow function,
// but it would have to live at the top of the file.
function reducer(state, action) {
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

  const { confirmPassword, ...user } = state
  const { email, password } = user

  const userEmailExists = async users =>
    await users.find(user => user.email.toLowerCase() === state.email.toLowerCase())

  const userPasswordMismatch = password !== confirmPassword
  const allFieldsValid = email && password && confirmPassword
  const userEmailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)

  const alertValidationErrors = async users =>
    (await userEmailExists(users))
      ? alert('This email is already taken')
      : userPasswordMismatch
      ? alert('Your passwords do not match')
      : !allFieldsValid
      ? alert('Please fill out all fields')
      : !userEmailValid
      ? alert('Please enter a valid email address')
      : null

  const getAllUsers = async () => await ApiManager.getAll('users')

  // Create the user and redirect user to home
  const createUser = async () => {
    const result = await ApiManager.createNew('users', user)
    setUser(result)
    history.push('/')
  }

  const createNewUser = event => {
    event.preventDefault()
    alertValidationErrors(getAllUsers())
    createUser()
  }

  const onFieldChange = (event, fieldType) => {
    const value = event && event.target && event.target.value
    dispatch({ type: 'setField', action: { field: fieldType, value } })
  }

  return (
    <>
      <img src={Logo} alt={'dtty logo'} className="smallLogo" />
      <form className="userAuthForm">
        <fieldset className="userAuthForm" id="signup">
          <h3>Sign Up:</h3>
          <div className="formgrid">
            <input
              onChange={e => onFieldChange('firstName')}
              type="name"
              className="createAccountInput"
              id="firstName"
              placeholder="First name"
              required=""
            />
            <input
              onChange={e => onFieldChange('lastName')}
              type="name"
              className="createAccountInput"
              id="lastName"
              placeholder="Last name"
              required=""
            />
            <input
              onChange={e => onFieldChange('email')}
              type="email"
              className="createAccountInput"
              id="email"
              placeholder="Email address"
              required=""
            />
            <input
              onChange={e => onFieldChange('password')}
              type="password"
              className="createAccountInput"
              id="password"
              placeholder="Password"
              required=""
            />
            <input
              onChange={e => onFieldChange('confirmPassword')}
              type="password"
              className="createAccountInput"
              id="confirmPassword"
              placeholder="Confirm password"
              required=""
            />
          </div>
          <button onClick={createNewUser} type="submit" className="button" id="signupButton">
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
