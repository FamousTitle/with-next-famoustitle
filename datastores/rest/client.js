import axios from "axios"

function headers(options) {
  return {
    headers: {
      JWT_AUD: "web",
      Authorization: options.session.accessToken,
      "Content-Type": options.contentType,
    },
  }
}

function host() {
  let hostname = process.env.NEXT_PUBLIC_CLIENT_HOST

  // set host to server if not calling from browser (backend call)
  if (typeof window === "undefined") {
    hostname = process.env.NEXT_PUBLIC_SERVER_HOST
  }

  return hostname
}

export function create(options) {
  return axios.post(`${host()}/${options.uri}`, options.data, headers(options))
}

export function destroy(options) {
  return axios.delete(`${host()}/${options.uri}`, headers(options))
}
