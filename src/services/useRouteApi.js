import React, { useState } from 'react'

export const useRouteApi = () => {
    const [api, setapi] = useState("https://visibility-nuke-hayes-vocals.trycloudflare.com")
    
  return {
    api
  }
}
