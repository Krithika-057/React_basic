import React, { useState, useReducer, useCallback } from 'react';
import UserList from './Lists';
import "./scss/Form.scss";

const Form = () => {
  const [users, setUsers] = useState([]);

  const formReducer = (state, action) => {
    switch (action.type) {
      case 'SET_FIELD':
        return { ...state, [action.field]: action.value };
      case 'RESET':
        return { firstName: '', lastName: '', email: '' };
      default:
        return state;
    }
  };

  const [formState, dispatch] = useReducer(formReducer, {
    firstName: '',
    lastName: '',
    email: '',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({ type: 'SET_FIELD', field: name, value });
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formState.firstName) newErrors.firstName = 'First name is required';
    if (!formState.lastName) newErrors.lastName = 'Last name is required';
    if (!formState.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = 'Email is invalid';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setUsers([...users, formState]);
      dispatch({ type: 'RESET' });
    }
  };

  return (
    <div id="form-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formState.firstName}
            onChange={handleInputChange}
          />
          {errors.firstName && <span>{errors.firstName}</span>}
        </div>

        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formState.lastName}
            onChange={handleInputChange}
          />
          {errors.lastName && <span>{errors.lastName}</span>}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formState.email}
            onChange={handleInputChange}
          />
          {errors.email && <span>{errors.email}</span>}
        </div>

        <button type="submit">Submit</button>
      </form>

     
      <UserList users={users || []} />

    </div>
  );
};

export default Form;
