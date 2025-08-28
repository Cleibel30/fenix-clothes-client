import React, { useState } from 'react'

export const useRouteApi = () => {
    const [api, setapi] = useState("https://hometown-designers-mustang-hosts.trycloudflare.com")
    
  return {
    api
  }
}
