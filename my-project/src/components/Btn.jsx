import React from 'react'

function Btn({txt, bg, border}) {
  return (
   <>
   <button className={`w-fit h-10 rounded-2xl bg-${bg} border-${bg}`}>{txt}</button>
   </>
  )
}
export default Btn