import { ToastContainer, toast, Slide } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const TYPE_SUCCESS = "TYPE_SUCCESS"
const TYPE_WARNING = "TYPE_WARN"
const TYPE_INFO = "TYPE_INFO"
const TYPE_ERROR = "TYPE_ERROR"
const TYPE_DARK = "TYPE_DARK"

function showToast(message, options = {}) {
  if (options.type) {
    switch (options.type) {
      case TYPE_SUCCESS:
        toastSuccess(message, options)
      case TYPE_WARNING:
        toastWarning(message, options)
      case TYPE_INFO:
        toastInfo(message, options)
      case TYPE_ERROR:
        toastError(message, options)
      case TYPE_DARK:
        toastDark(message, options)
    }
  } else {
    toast(message, options)
  }
}

function toastSuccess(message, options) {
  toast.success(message, options)
}

function toastWarning(message, options) {
  toast.warn(message, options)
}

function toastInfo(message, options) {
  toast.info(message, options)
}

function toastError(message, options) {
  toast.error(message, options)
}

function toastDark(message, options) {
  toast.dark(message, options)
}

export default function App(props) {
  return (
    <ToastContainer
      position={props.position || "top-center"}
      autoClose={props.autoClose || 5000}
      hideProgressBar={props.hideProgressBar}
      newestOnTop={props.newestOnTop}
      transition={props.transition || Slide}
      closeOnClick
      rtl={props.rtl}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  )
}

export {
  showToast,
  toastDark,
  toastError,
  toastInfo,
  toastSuccess,
  toastWarning,
  TYPE_DARK,
  TYPE_ERROR,
  TYPE_INFO,
  TYPE_SUCCESS,
  TYPE_WARNING,
}
