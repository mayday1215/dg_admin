
import {USER_LOGING_SAVNE} from "./../action-types"
import {getUser} from "./../../utils/storageUtils"

const userInfo = getUser()
export default function user(state=userInfo,action) {
  switch (action.type) {
    case USER_LOGING_SAVNE:
      state = action.data

  }
  return state;
}
