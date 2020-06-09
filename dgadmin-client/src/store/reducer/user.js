
import {USER_LOGING_SAVNE,USER_LOGINGUP_REMOVE} from "./../action-types"
import {getUser} from "./../../utils/storageUtils"

const userInfo = getUser()
export default function user(state=userInfo,action) {
  switch (action.type) {
    case USER_LOGING_SAVNE:
      state = action.data
      break;
    case USER_LOGINGUP_REMOVE:
      state = {}
  }
  return state;
}
