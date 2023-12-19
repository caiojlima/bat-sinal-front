export const getMessages = async () => {
    return fetch('https://dark-erin-bandicoot-suit.cyclic.app/message',{
        method: 'GET'
    }).then((data) => data.json())
}

export const sendMessage = async (user, message) => {
    console.log(`Dentro da api: ${{user, message}}`);
    return fetch('https://dark-erin-bandicoot-suit.cyclic.app/message',{
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