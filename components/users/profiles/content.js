import { useRef, useState } from "react"
import { UserCircleIcon } from "@heroicons/react/24/solid"
import { useStoreValue } from "contexts/store-context"
import { uploadAvatar } from "datastores/rest/upload"
import { toastSuccess, toastError } from "components/notification"
import { updateUser } from "datastores/graphql/users"

export default function Content() {
  const inputFileRef = useRef()
  const inputPasswordRef = useRef()
  const inputPasswordConfirmationRef = useRef()
  const [disabled, setDisabled] = useState(false)
  const [state, dispatch] = useStoreValue()

  const { session, user } = state

  const [avatarURL, setAvatarURL] = useState(
    user.avatar ? user.avatar.thumbUrl : null
  )

  async function uploadBtnClicked(e) {
    setDisabled(true)
    let actionPreformed = false

    // first save password
    if (
      inputPasswordRef.current.value !== "" &&
      inputPasswordConfirmationRef.current.value !== ""
    ) {
      actionPreformed = true
      const success = await updateUser({
        session,
        password: inputPasswordRef.current.value,
        passwordConfirmation: inputPasswordConfirmationRef.current.value,
      })

      // try to change password, if failure, return and don't try file upload
      if (success) {
        inputPasswordRef.current.value = ""
        inputPasswordConfirmationRef.current.value = ""
      } else {
        toastError("Update was not successful")
        setDisabled(false)
        return
      }
    }

    // if successful, upload image
    const file = inputFileRef.current.files[0]
    if (file) {
      actionPreformed = true
      const response = await uploadAvatar({ session, avatar: file })
      inputFileRef.current.value = ""
    }

    setDisabled(false)

    if (actionPreformed) {
      toastSuccess("Profile has been updated!")
    }
  }

  return (
    <div className="mb-10">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Profile
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will only be shared with your team lead
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Photo
              </label>

              <div className="mt-2 flex items-center gap-x-3">
                {avatarURL === null ? (
                  <UserCircleIcon
                    className="h-20 w-20 text-gray-300"
                    aria-hidden="true"
                  />
                ) : (
                  <div>
                    <img className="h-20 w-20 rounded-full" src={avatarURL} />
                  </div>
                )}

                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span className="cursor-pointer rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    Change
                  </span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    ref={inputFileRef}
                    accept="image/png, image/jpeg"
                    onChange={(e) => {
                      const file = e.target.files[0]
                      if (typeof file !== "undefined") {
                        let url = window.URL.createObjectURL(file)
                        setAvatarURL(url)
                      }
                    }}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Password
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Update your current password. Remember, password must be at least 6
            characters and password and password confirmation must match.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    New Password
                  </label>
                  <div className="mt-2">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      ref={inputPasswordRef}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="password_confirmation"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    New Password (Confirmation)
                  </label>
                  <div className="mt-2">
                    <input
                      type="password"
                      name="password_confirmation"
                      id="password_confirmation"
                      ref={inputPasswordConfirmationRef}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          disabled={disabled}
          onClick={uploadBtnClicked}
        >
          {disabled ? "Processing..." : "Save"}
        </button>
      </div>
    </div>
  )
}
