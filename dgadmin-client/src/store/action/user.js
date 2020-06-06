import {USER_LOGING_SAVNE} from "./../action-types"
//保存用户登录返回type
const saveLoginUser = (user) =>({type:USER_LOGING_SAVNE,data:user})

export default {
  saveLoginUser
}
