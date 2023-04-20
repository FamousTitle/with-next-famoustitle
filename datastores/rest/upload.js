import { create, destroy } from "datastores/rest/client"

export function upload({ session, files }) {
  return create({
    uri: "uploads",
    data: { files },
    contentType: "multipart/form-data",
    session,
  })
}

export function uploadAvatar({ session, avatar }) {
  return create({
    uri: "avatars",
    data: { avatar },
    contentType: "multipart/form-data",
    session,
  })
}

export function remove({ session, uri }) {
  return destroy({
    session,
    uri,
  })
}
