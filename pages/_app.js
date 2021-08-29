import Notification from "components/notification"
import { Fragment } from "react"
import "tailwindcss/tailwind.css"

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Notification />
      <Component {...pageProps} />
    </Fragment>
  )
}

export default MyApp
