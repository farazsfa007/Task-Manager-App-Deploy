import {toast} from 'react-toastify'
export const notify = (message,type) => {
    toast[type](message)
}
export const API_URL = "https://task-manager-app-deploy-api-swart.vercel.app"
