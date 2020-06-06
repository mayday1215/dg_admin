import store from "store";
const USER_KEY = "user_key"
export const saveUser = (user) =>{
  store.set(USER_KEY,user)
}
export const getUser = () => {
  return store.get(USER_KEY) || {}
}

export const removeUser = () => {
  store.remove(USER_KEY)
}





