import React, { useState } from 'react'

export const useFunctionEffects = () => {
    const [activeShadow, setactiveShadow] = useState(false)
    const bagEfect = (event) => {  
        const bagContainer = document.querySelector(".bag-container")
        /* const shadow = document.querySelector(".shadow")
        shadow.classList.add("bag-active") */
        bagContainer.classList.add("bag-active")

    }
    
    const searchEfect = (event) => {
        const search = document.querySelector(".search")
        search.classList.toggle("search_active")
        
        setactiveShadow(true)
    }


    const showDesple = (event) => {
        const desple = document.querySelector(".desple-nav")
        desple.classList.toggle("desple")

        setactiveShadow(true)

    }
    const showProfile = (event) => {
        const desple = document.querySelector(".desple-nav-profile")
        desple.classList.toggle("desple")

        setactiveShadow(true)
    }

    const showMenu = (event) => {
        const menu = document.querySelector(".menu-nav")
        menu.classList.toggle("menu-active")

        setactiveShadow(true)

        
    }

    const closedCont = (event) => {
        setactiveShadow(false)

        const search = document.querySelector(".search")
        search.classList.remove("search_active")

        const despleNav = document.querySelector(".desple-nav")
        despleNav.classList.remove("desple")

        const desple = document.querySelector(".desple-nav-profile")
        desple.classList.remove("desple")

        const menu = document.querySelector(".menu-nav")
        menu.classList.remove("menu-active")
    }

    const closedBag = (event) => {
        const bagContainer = document.querySelector(".bag-container")
        bagContainer.classList.remove("bag-active")
        const shadow = document.querySelector(".shadow-bag")
        shadow.classList.remove("bag-active")
    }

  return {
    bagEfect,
    searchEfect,
    showDesple,
    showProfile,
    showMenu,
    closedCont,
    closedBag,
    activeShadow
  }
}
