export async function updateUsers(places){
    try {
      fetch('http://localhost:3000/user-places' ,{
        method: 'PUT',
        body : JSON.stringify({places}),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    } catch (error) {
      console.log(error)
    }
};