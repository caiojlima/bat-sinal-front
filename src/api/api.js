export const getMessages = async () => {
    return fetch('https://rich-puce-bull-kilt.cyclic.app/message',{
        method: 'GET'
    }).then((data) => data.json())
}

export const sendMessage = async (user, message) => {
    console.log(`Dentro da api: ${{user, message}}`);
    return fetch('https://rich-puce-bull-kilt.cyclic.app/message',{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            user, message
        })
    })
}