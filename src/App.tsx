import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Transformer } from "react-konva";
import { observer } from "mobx-react-lite";
import starsStore from "./store/StarStore";
import { KonvaEventObject } from "konva/lib/Node";
import { Header } from "./Header";
import { Shape } from './Shape';

interface ShapeItem {
  id: string;
  x: number;
  y: number;
  rotation: number;
  isDragging: boolean;
  typeOfShape: String
}

const App = observer( () => {
  const refs: any[] = [];
  const options: string[] = [ 'Star', 'Rect' ];
  const [ typeOfShape, setTypeOfShape ] = useState<String>( 'Star' );
  const [ shapes, setShapes ] = useState<ShapeItem[]>( [] );

  const [ rects, setRects ] = useState<ShapeItem[]>( [] );


  const [ selectedId, selectShape ] = useState<string | null>( null );

  const trRef = useRef<any>();

  const shapeRef = useRef<any>();

  useEffect( () => {
    if ( !shapeRef.current ) {
      trRef.current?.getLayer().batchDraw();
      return;
    }
    trRef.current?.nodes( [ shapeRef?.current ] );
    trRef.current?.getLayer().batchDraw();
  }, [ selectedId ] );

  const handleDragStart = ( e: KonvaEventObject<DragEvent> ) => {
    const starNewDragStatus = shapes.map( ( star: ShapeItem ) => {
      return star.id === e.target.id()
        ? {
          ...star,
          isDragging: true,
        }
        : star;
    } );

    setShapes( [ ...starNewDragStatus ] );

  };
  const handleDragEnd = ( e: KonvaEventObject<DragEvent> ) => {
    starsStore.setSize( {
      id: e.target.id(),
      y: e.target.attrs.y,
      x: e.target.attrs.x,
      width: e.target.width(),
    } );

    const starNewDragStatus = shapes.map( ( star: ShapeItem ) => {
      return star.id === e.target.id()
        ? {
          ...star,
          isDragging: false,
        }
        : star;
    } );

    setShapes( [ ...starNewDragStatus ] );

  };

  const clickLayer = ( e: any ) => {
    if ( e.target.getStage() !== e.target ) {
      const curRef = refs.find( ( el: any ) => el.attrs.id === e.target.attrs.id );
      shapeRef.current = curRef;
      selectShape( e.target );

      return;
    }

    selectShape( null );
    const newShape = {
      typeOfShape,
      id: Math.random().toString(),
      x: e.evt.clientX,
      y: e.evt.clientY,
      rotation: Math.random() * 180,
      isDragging: false,
    };
    if (typeOfShape === 'Rect') {
      setRects( ( prevshapes ) => [ ...prevshapes, newShape ] );
    } else {
      setShapes( ( prevshapes ) => [ ...prevshapes, newShape ] );
    }
    
    console.log('shapes', shapes)

  };

  const onChage = ( e: any ) => {
    setTypeOfShape( e.target.value );
    // setShapes( [] );
  };

  return (
    <div>
      <Header change={onChage} options={options}></Header>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onClick={clickLayer}
      >
        <Layer>
          <Shape
            rects={rects}
            refs={refs}
            shapes={shapes}
            handleDragEnd={handleDragEnd}
            handleDragStart={handleDragStart}
            typeOfShape={typeOfShape}>
          </Shape>
          {selectedId && (
            <Transformer
              ref={trRef}
              boundBoxFunc={( oldBox, newBox ) => {
                if ( newBox.width < 5 || newBox.height < 5 ) {
                  return oldBox;
                }
                return newBox;
              }}
            />
          )}
        </Layer>
      </Stage>
    </div>

  );
} );

export default App;
