import {USER_LOGING_SAVNE,USER_LOGINGUP_REMOVE} from "./../action-types"
//保存用户登录返回type
const saveLoginUser = (user) =>({type:USER_LOGING_SAVNE,data:user})

//登出
const removeUser = () => ({type:USER_LOGINGUP_REMOVE})

export default {
  saveLoginUser,removeUser
}
