import React, { useState } from 'react';
import styled from 'styled-components';

function Card({ key, name, show, scale, disabled, onClick, penalty, className }) {
  scale = scale || 1

  return name
    ? (
      <Image
        src={require(`img/${show ? name : 'carddeck'}.png`)}
        scale={scale}
        onClick={() => (onClick ? onClick(name) : () => {})}
        className={className}
      />
    )
    : (
      <Outline scale={scale} className={className} />
    )
}

const Image = styled.img`
  cursor: pointer;
  height: ${props => 125 * props.scale}px;
  width: ${props => 82 * props.scale}px;
`

const Outline = styled.div`
  // cursor: pointer;
  height: ${props => 125 * props.scale}px;
  width: ${props => 82 * props.scale}px;
  border: 1px solid lightgrey;
  border-radius: 5px;
`

export default Card
