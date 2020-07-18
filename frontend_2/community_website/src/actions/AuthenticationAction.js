export const SHOW_LOGIN_DIALOG = 'SHOW_LOGIN_DIALOG'
export const HIDE_LOGIN_DIALOG = 'HIDE_LOGIN_DIALOG'

export const AUTHENTICATION_PENDING = 'AUTHENTICATION_PENDING'  
export const AUTHENTICATION_SUCCESS = 'AUTHENTICATION_SUCCESS'  
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR'      


export function getShowLoginDialogAction()
{
    return{
    type: SHOW_LOGIN_DIALOG
    }
}

export function getHideLoginDialogAction()
{
    return{
    type: HIDE_LOGIN_DIALOG
    }
}

export function getAuthenticationPendingAction()    
{
    return{
    type: AUTHENTICATION_PENDING
    }
}

export function getAuthenticationSuccessAction(userSession)    
{
    return{
    type: AUTHENTICATION_SUCCESS,
    user: userSession.user,
    accessToken: userSession.accessToken
    }
}

export function getAuthenticationErrorAction()      
{
    return{
    type: AUTHENTICATION_ERROR
    }
}


export function authenticateUser(email, password){

    console.log("Authenticate");

    return dispatch => { 
        const action = getAuthenticationPendingAction();
        dispatch (action)
        login(email,password)
            .then(      
                userSession => {
                    const action = getAuthenticationSuccessAction(userSession);
                    dispatch(action)
                },
                error => {
                    dispatch(getAuthenticationErrorAction(error))
                }
            )
            .catch(error => {
                dispatch(getAuthenticationErrorAction(error))
            })
    }
    
}

function login(email,password){
    const requestOptions = {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email,password})
    };

    return fetch('http://localhost:3200/user/login', requestOptions)
        .then(handleResponse)
        .catch(error => alert("E-Mail oder Passwort stimmen nicht!"))
        .then(userSession => {            
            return userSession
        });
}

function handleResponse(response){
    const authorizationHeader = response.headers.get('Authtoken')
    return response.text().then(text => {
        console.log('Receive Result: '+authorizationHeader)

        const data = text && JSON.parse(text);
        var token

        if(authorizationHeader){
            token=authorizationHeader;
            localStorage.setItem('token', token);
        }

        if(!response.ok){
            if(response.status === 401){
                logout();
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        else {
            let userSession = {
                user:data,
                accessToken: token 
            }

           // console.log(localStorage);
          //  console.log(userSession);
            return userSession;
        }
        
    })

}

function logout(){
    console.error("should logout user");
    
}
