export const SHOW_LOGIN_DIALOG = 'SHOW_LOGIN_DIALOG'
export const HIDE_LOGIN_DIALOG = 'HIDE_LOGIN_DIALOG'

export const AUTHENTICATION_PENDING = 'AUTHENTICATION_PENDING'  //8
export const AUTHENTICATION_SUCCESS = 'AUTHENTICATION_SUCCESS'  //9
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR'      //9


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

export function getAuthenticationPendingAction()    //10
{
    return{
    type: AUTHENTICATION_PENDING
    }
}

export function getAuthenticationSuccessAction(userSession)    //11
{
    return{
    type: AUTHENTICATION_SUCCESS,
    user: userSession.user,
    accessToken: userSession.accessToken
    }
}

export function getAuthenticationErrorAction()      //12
{
    return{
    type: AUTHENTICATION_ERROR
    }
}


export function authenticateUser(email, password){ //13

    console.log("Authenticate");

    return dispatch => { 
        const action = getAuthenticationPendingAction();//14
        dispatch (action)
        login(email,password) //15
            .then(      
                userSession => {//16
                    const action = getAuthenticationSuccessAction(userSession);
                    dispatch(action)
                },
                error => {//16
                    dispatch(getAuthenticationErrorAction(error))
                }
            )
            .catch(error => {
                dispatch(getAuthenticationErrorAction(error))
            })
    }
    
}

function login(email,password){    //17
    const requestOptions = {
        method: 'POST',         //18
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email,password})
    };

    return fetch('http://localhost:3200/user/login', requestOptions)    //19
        .then(handleResponse)   //20
        .catch(error => alert("E-Mail oder Passwort stimmen nicht!"))
        .then(userSession => {            
            return userSession
        });
}

function handleResponse(response){  //21
    const authorizationHeader = response.headers.get('Authtoken')   //22
    return response.text().then(text => {   //23
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


//8     Login Prozess beginnt
//9     Actiontypes welche geschickt werden wenn Login erfolgreich oder nicht
//10    JS Obj wird angelegt mit typ AUTHENTICATION_PENDING
//11    typ wird festgelegt, userObj und token aus dem Header werden angelegt (beu suucces wird name und token aus header angelegt)
//12    typ wird festgelegt un dfehlernachricht (payload) wird zurückgegeben

/*****************authenticateUser******************************************************************* */
//13    Fkt für tatsächliche Authentifizierung mit Parameter userID und pw aus den Eingaben im Login Dialog
//14    über Dispatch(Versand) methode wird Auth_PENDING geschickt --> Begin 
//15    remote call per Loginfkt (gibt Promise zurück) auf Backend für Durchführung Login    
//16    response auswerten --> wenn userSession Obj da ist 
//      if response yes dann Auth_SUCCESS, if response no dann Auth_ERR 

//17    login fkt bekommt userid u pw
//18    schicken an backend ein POST request (data als json) und in body den json content, also userid un pw --> entspricht REST Call aus testing:
//      Route wird aufgerufen und Data wird als json obkj übergeben anhand const requestOptions
//19    url und requestOptions werden mit fetch aufgerufen
//20    dann wird callback fkt übergeben -> verarbeitet response bzw die verarbeitung wird ausgelagert

/*****************LOGINFKT******************************************************************* */
//21    callbackfkt bekommt response obj
//22    authtoken au sheader holen
//23    in den header text reingehen und authoken ausgeben

//
