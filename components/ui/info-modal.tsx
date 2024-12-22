import React from 'react'
import { Label } from './label'

interface InfoModalProps{
    title: string,
    value: number,
}

const InfoModal = ({title,value}:InfoModalProps) => {
  return (
    <div className='p-4 flex flex-col space-y-2 text-center'>
        <p className='text-n-1 text-lg font-bold'>{value}</p>
        <Label className='text-n-2 font-medium text-sm'>{title}</Label>
    </div>
  )
}

export default InfoModal
