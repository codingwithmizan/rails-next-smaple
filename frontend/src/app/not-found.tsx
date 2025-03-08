import React from 'react'
import Link from 'next/link'

const Notfound = () => {
  return (
    <div className='p-20 text-center'>
      <h2 className='mb-4'>Not found page</h2>
      <Link href="/" className='border p-2 rounded'>Home</Link>
    </div>
  )
}

export default Notfound