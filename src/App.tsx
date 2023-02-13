import React, { useState } from 'react';
import { Stage, Layer, Star } from 'react-konva';
import { observer } from "mobx-react-lite";
import starsStore from './store/StarStore';


let arr: any = [];

// return arr.map( ( _: any, i: number ) => ( {
//   id: i.toString(),
//   x: Math.random() * window.innerWidth,
//   y: Math.random() * window.innerHeight,
//   rotation: Math.random() * 180,
//   isDragging: false,
// } ) );

// const INITIAL_STATE = [];

const App = observer( () => {
  const [ stars, setStars ] = useState<any>( [] );

  const handleDragStart = ( e: any ) => {
    const id = e.target.id();
    setStars(
      stars.map( ( star: any ) => {
        return {
          ...star,
          isDragging: star.id === id,
        };
      } )
    );
  };
  const handleDragEnd = ( e: any ) => {

    starsStore.setSize( {
      id: e.target.id(),
      y: e.target.attrs.y,
      x: e.target.attrs.x,
      width: e.target.width(),
    } );

    setStars(
      stars.map( ( star: any ) => {
        return {
          ...star,
          isDragging: false,
        };
      } )
    );
  };

  const clickLayer = ( e: any ) => {
    arr.push(
      {
        id: Math.random().toString(),
        x: e.evt.clientX,
        y: e.evt.clientY,
        rotation: Math.random() * 180,
        isDragging: false,
      }
    );
    setStars( [ ...arr ] );
    console.log('stars', stars)
  };
 
  return (
    <Stage width={window.innerWidth} height={window.innerHeight} onClick={clickLayer}>
      <Layer >
        {stars.map( ( star: any, i:any ) => (
          <Star
            key={i}
            id={star.id}
            x={star.x}
            y={star.y}
            numPoints={5}
            innerRadius={20}
            outerRadius={40}
            fill="#89b717"
            opacity={0.8}
            draggable
            rotation={star.rotation}
            shadowColor="black"
            shadowBlur={10}
            shadowOpacity={0.6}
            shadowOffsetX={star.isDragging ? 10 : 5}
            shadowOffsetY={star.isDragging ? 10 : 5}
            scaleX={star.isDragging ? 1.2 : 1}
            scaleY={star.isDragging ? 1.2 : 1}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          />
        ) )}
      </Layer>
    </Stage>
  );
} );

export default App;