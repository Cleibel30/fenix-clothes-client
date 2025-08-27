import React, { useState } from 'react'

export const useRouteApi = () => {
    const [api, setapi] = useState("http://localhost:3000")
    
  return {
    api
  }
}
