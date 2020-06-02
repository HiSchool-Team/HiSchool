import React from 'react'
import { Rate } from 'antd'
import { Rating } from '../types'

type Props = {
  rating: Rating,
}

export const StarRating = ({ rating }: Props) => {
  return (
    <div>
      <Rate disabled defaultValue={rating.value}/>
      <p>From {rating.num_raters} ratings</p>
    </div>
  )
}
