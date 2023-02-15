import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Star, Transformer } from 'react-konva';
import { observer } from "mobx-react-lite";
import starsStore from './store/StarStore';


let arr: any = [];

const App = observer( () => {
  const refs: any = [];

  const [ stars, setStars ] = useState<any>( [] );

  const [ selectedId, selectShape ] = useState<any>( null );

  const trRef = useRef<any>();

  const shapeRef = useRef<any>();

  useEffect( () => {
    if ( !shapeRef.current ) {
      return;
    }
    // console.log('selectedId', shapeRef)
    trRef.current?.nodes( [ shapeRef?.current ] );
    trRef.current?.getLayer().batchDraw();
  }, [ selectedId ] );

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

    if ( e.target.getStage() !== e.target ) {
      let curRef = refs.find( ( el: any ) => el.attrs.id === e.target.attrs.id );
      shapeRef.current = curRef;
      selectShape( e.target );
      return;
    }
    selectShape( null );
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
  };

  return (

    <Stage width={window.innerWidth} height={window.innerHeight} onClick={clickLayer}>
      <Layer >
        {stars.map( ( star: any, i: any ) => (
          <Star
            key={i}
            id={star.id}
            x={star.x}
            y={star.y}
            ref={( ref: any ) => ref && refs.push( ref )}
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
        {selectedId && (
          <Transformer
            ref={trRef}
            boundBoxFunc={( oldBox, newBox ) => {
              // limit resize
              if ( newBox.width < 5 || newBox.height < 5 ) {
                return oldBox;
              }
              return newBox;
            }}
          />
        )}
      </Layer>
    </Stage>
  );
} );

export default App;