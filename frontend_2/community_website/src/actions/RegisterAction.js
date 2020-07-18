export const SHOW_REGISTER_DIALOG = 'SHOW_LOGIN_DIALOG'
export const HIDE_REGISTER_DIALOG = 'HIDE_LOGIN_DIALOG'



export function getShowRegisterDialogAction()
{
    return{
    type: SHOW_REGISTER_DIALOG
    }
}

export function getHideRegisterDialogAction()
{
    return{
    type: HIDE_REGISTER_DIALOG
    }
}