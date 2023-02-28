import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Transformer, Star, Rect, } from "react-konva";
import { observer } from "mobx-react-lite";

import { Header } from "./Header";
import { Shape } from './Shape';

interface ShapeItem {
  id: string;
  x: number;
  y: number;
  rotation: number;
  isDragging: boolean;
  typeOfShape: String;
}

const App = observer( () => {
  const refs: any[] = [];
  const options: string[] = [ 'Star', 'Rect' ];
  const [ typeOfShape, setTypeOfShape ] = useState<String>( 'Star' );
  const [ shapes, setShapes ] = useState<ShapeItem[]>( [] );



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

    setShapes( ( prevshapes ) => [ ...prevshapes, newShape ] );


    console.log( 'shapes', shapes );

  };

  const onChage = ( e: any ) => {
    setTypeOfShape( e.target.value );
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
          {
            shapes.map( ( el: ShapeItem ) => {
                return <Shape key={el.id} shape={el} setShapes={setShapes} refs={refs} shapes={shapes}></Shape>;
              }
            )
          }
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
