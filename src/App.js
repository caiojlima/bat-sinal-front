import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { getMessages, sendMessage } from './api/api.js'

function App() {
  const [login, setLogin] = useState(true)
  const [input, setInput] = useState({message: '', uname: ''})
  const [user, setUser] = useState('');
  const[state, setState] = useState([])

  useEffect(() => {
    (async () => {
      const result = await getMessages();
      setState(result)
    })()
    setInterval(() => {
      (async () => {
        const result = await getMessages();
        setState(result)
      })()
    }, 1000);
  },[])

  const handleChange = ({ target: { name, value } }) => {
    setInput({...input, [name]: value})
  }

  const updateState = (user, message) => {
    console.log({user, message});
    sendMessage(user, message)
    setState([...state, { user, message: input.message }])
    setInput({...input, message: ''})
  }

  return (
    <div className="App" >
      {!login ? (<div className='App'>
        <div className='main-div'>
          { state && state.map((element) => (element.user !== user ?
            (<div className='block'>
              <div className='message'>
                <p className='user'>{element.user}</p>
                <p className='text'>{element.message}</p>
              </div>
            </div>) : (
              <div className='block-user'>
              <div className='user-message'>
                <p className='text'>{element.message}</p>
              </div>
            </div>
            )
          )) }
        </div>
        <div className='input-div'>
              <input type='text' placeholder='Digite sua mensagem...' name='message' onChange={handleChange} value={input.message}></input>
              <button onClick={() => { updateState(user, input.message) }}>{'>'}</button>
        </div>
      </div>) : (
          <div class="container">
          <div className='title-container'>
            <h2>LOGIN</h2>
          </div>
          <div className='form-container'>
            <div className='inputs-container'>
              <input type="text" placeholder="USER" name="uname" onChange={handleChange} value={input.uname}></input>
              <input type="text" placeholder="PASSWORD" name="uname" onChange={handleChange} value={input.uname}></input>
              <input type="text" placeholder="SECRET KEY" name="uname" onChange={handleChange} value={input.uname}></input>
            </div>
            <div className='register-container'>
              <button className='register'>Register here...</button>
            </div>
            <div className='login-btn-container'>
              <button type="submit" onClick={() => { setUser(input.uname); setLogin(false) }}>Login</button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default App;
