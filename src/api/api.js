export const getMessages = async (key) => {
    return fetch('https://bat-sinal.vercel.app/message?key=' + key, {
        method: 'GET'
    }).then((data) => data.json())
}

export const getSecret = async (key) => {
    return fetch('https://bat-sinal.vercel.app/secret?key=' + key, {
        method: 'GET'
    }).then((data) => data.json())
}

export const sendMessage = async (user, message, secretKey) => {
    return fetch('https://bat-sinal.vercel.app/message',{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            user, message, secretKey
        })
    })
}

export const registerPost = async (user, password) => {
    return fetch('https://bat-sinal.vercel.app/register',{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            user, password
        })
    })
}