import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { getMessages, sendMessage, registerPost, getSecret } from './api/api.js'

function App() {
  const [login, setLogin] = useState(true)
  const [input, setInput] = useState({message: '', uname: ''})
  const [user, setUser] = useState('');
  const [key, setKey] = useState('');
  const[state, setState] = useState([])
  const [register, setRegister] = useState(true)

  useEffect(() => {
    (async () => {
      if(key) {
        const result = await getMessages(key);
        setState(result)
      }
    })()
    setInterval(() => {
      (async () => {
        if(key) {
          const result = await getMessages(key);
          setState(result)
        }
      })()
    }, 100);
  },[key])

  const handleChange = ({ target: { name, value } }) => {
    setInput({...input, [name]: value})
  }

  const updateState = (user, message, key) => {
    if (message) sendMessage(user, message, key)
    
    setInput({...input, message: ''})
  }

  const registerUser = (user, key) => {
    console.log(user, key);
    registerPost(user, key)
    setRegister(false)

  }

  const onClic = async () => {
    const result = await getSecret(input.key)
    if(result.length) {
      setLogin(false)
      setUser(input.user); 
      setKey(input.key);
    } else {
      setInput({user: '', key: ''})
    }
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
        <form className='input-div' onSubmit={(event) => { event.preventDefault(); updateState(user, input.message, key) }}>
              <input type='text' placeholder='Digite sua mensagem...' name='message' onChange={handleChange} value={input.message}></input>
              <button ></button>
        </form>
      </div>) : (
          <div className="container">
          <div className='title-container'>
            <h2>LOGIN</h2>
          </div>
          {(<div className='form-container'>
            <div className='inputs-container'>
              <input type="text" placeholder="USER" name="user" onChange={handleChange} value={input.user}></input>
              <input type="text" placeholder="SECRET KEY" name="key" onChange={handleChange} value={input.key}></input>
            </div>
            <div className='login-btn-container'>
              <button type="submit" onClick={onClic}>Login</button>
            </div>
          </div>)}
        </div>
      )}
      
    </div>
  );
}

export default App;
