import React from 'react'

function layout({children}) {
  return (
    <div className="mx-5 md:mx-20 lg:mx-36">
        {children}
    </div>
  )
}

export default layout