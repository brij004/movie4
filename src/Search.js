import React from 'react'
import { GlobaleContext } from './context'

const search= () => {
  const {query,setQury,isError} = GlobaleContext();
  return (
    <>
  <section className='search-section'>
<h2>Search your Favorite Movie</h2>
<form action='#' onSubmit={(e)=>e.preventDefault()}>
<div>
  <input type='text' placeholder='Search heare' value={query} onChange={(e)=>setQury(e.target.value )}/>
</div>
</form>
<div className='card-error'>
<p>{isError.show && isError.msg}</p>
</div>
  </section>

      
    </>
  )
}

export default search
