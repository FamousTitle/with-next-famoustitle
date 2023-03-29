import * as Auth from "next-auth/react"
import "@testing-library/jest-dom"
import * as UserStore from "datastores/graphql/users"

import { getServerSideProps } from "pages/index"

jest.mock("datastores/graphql/users", () => {
  return {
    __esModule: true,
  }
})

describe("getServerSideProps", () => {
  describe("user is logged in", () => {
    beforeEach(() => {
      Auth.getSession = jest.fn().mockResolvedValue(true)
    })

    describe("currentUser exists", () => {
      beforeEach(() => {
        UserStore.getCurrentUser = jest.fn().mockResolvedValue("user123")
      })

      it("return user and session props", async () => {
        const results = await getServerSideProps({})
        expect(results).toEqual({
          props: { session: true, user: "user123" },
        })
      })
    })

    describe("currentUser does not exists", () => {
      beforeEach(() => {
        UserStore.getCurrentUser = jest.fn().mockResolvedValue(false)
      })

      it("redirects to /login", async () => {
        const results = await getServerSideProps({})
        expect(results).toEqual({
          redirect: { permanent: false, destination: "/login" },
        })
      })
    })
  })

  describe("user is not logged in", () => {
    beforeEach(() => {
      Auth.getSession = jest.fn().mockResolvedValue(false)
    })

    it("redirects to /login", async () => {
      const results = await getServerSideProps({})
      expect(results).toEqual({
        redirect: { permanent: false, destination: "/login" },
      })
    })
  })
})
