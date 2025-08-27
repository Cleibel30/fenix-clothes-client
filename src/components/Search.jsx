import { useState } from "react"


export const Search = () => {

  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() === "") {
      return;
    }

    window.location.href = `/busqueda?search=${search.trim()}`;
  }


  return (
    <>
      <div className='search shadow-sm p-3'>
        <form action="" onSubmit={handleSearch} className='d-flex align-items-center justify-content-between'>
          <input value={search} onChange={(e)=> setSearch(e.target.value)} type="search" placeholder='Buscar productos' className='w-100 p-2 input-search' />
          <button type="submit" className='button p-2'><i class="fa-solid fa-magnifying-glass fs-3"></i></button>
        </form>
      </div>
    </>
  )
}
