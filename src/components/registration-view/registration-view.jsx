import React, { useState } from 'react';
import axios from 'axios';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    console.log('form submitted');
    /* props.onRegister(false); */
  };

  return (
    <form onSubmit={handleRegister}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => {
            console.log('handle change', e); setUsername(e.target.value)}
            }
          required
        />
      </label>

      <label>
        Password:
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => {
            console.log('handle change', e); setPassword(e.target.value)}
            }
          required
        />
      </label>

      <label>
        Email:
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => {
            console.log('handle change', e); setEmail(e.target.value)}
            }
          required
        />
      </label>

      <label>
        Birthday:
        <input
          type="date"
          value={birthday}
          placeholder="Birthday"
          onChange={(e) => {
            console.log('handle change', e); setBirthday(e.target.value)}
            }
          required
        />
      </label>

      <button type="submit" onClick={handleRegister}>
        Register
      </button>
    </form>
  );
}
