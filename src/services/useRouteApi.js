import React, { useState } from 'react'

export const useRouteApi = () => {
    const [api, setapi] = useState("https://september-class-show-guidelines.trycloudflare.com")
    
  return {
    api
  }
}
