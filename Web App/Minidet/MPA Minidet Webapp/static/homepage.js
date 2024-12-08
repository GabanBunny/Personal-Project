// Function to load the login.html 
async function loadLoginForm() {
    const loginHtml = '/Login';
    try{ //Test the response
        const response = await fetch(loginHtml);
        if(response.ok){
            const data = await response.text() //return body of response obj as a string
            document.getElementById('loginContainer').innerHTML = data;
        }
        else{
            console.error('Failed to load login form: ', response.status, response.statusText);
        }
    } catch (error){
        console.log(error);
    }
}




