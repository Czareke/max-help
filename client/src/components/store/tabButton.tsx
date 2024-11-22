import React from 'react'

interface NavProps {
    icon: React.ReactNode; 
    name: string; 
    isSelected: boolean; 
  }

const tabButton: React.FC<NavProps> = ({ icon, name, isSelected }) => {

    const divStyles = isSelected
    ? 'bg-blue-600 text-white'
    : ''
    const textStyle = isSelected
    ? 'text-white'
    : 'text-black'

  return (
      <div className={`${divStyles} mx-auto py-3 px-2 text-blue-600`} onClick={() => (name)}>
        <div className='mx-auto py-[3px] px-[8px]  '>
          {icon}
        </div>
        <p className={`${textStyle} text-center text-xs`}>{name}</p>
      </div>
  )
}

export default tabButton
