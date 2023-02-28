import React, { FC } from 'react';
import { Star, Rect, } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";
import starsStore from "./store/StarStore";


interface ShapeProps {
    setShapes: Function;
    refs: any;
    shapes: ShapeItem[];
    shape: ShapeItem;
}
interface ShapeItem {
    id: string;
    x: number;
    y: number;
    rotation: number;
    isDragging: boolean;
    typeOfShape: String;
}

export const Shape: FC<ShapeProps> = ( { setShapes, refs, shapes, shape } ) => {

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

    return (
        <>
            {
                shape.typeOfShape === 'Star' && (
                    <Star
                        key={shape.id}
                        id={shape.id}
                        x={shape.x}
                        y={shape.y}
                        ref={( ref: any ) => ref && refs.push( ref )}
                        numPoints={5}
                        innerRadius={20}
                        outerRadius={40}
                        fill="#89b717"
                        opacity={0.8}
                        draggable
                        rotation={shape.rotation}
                        shadowColor="black"
                        shadowBlur={10}
                        shadowOpacity={0.6}
                        shadowOffsetX={shape.isDragging ? 10 : 5}
                        shadowOffsetY={shape.isDragging ? 10 : 5}
                        scaleX={shape.isDragging ? 1.2 : 1}
                        scaleY={shape.isDragging ? 1.2 : 1}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                    />
                )
            }
            {
                shape.typeOfShape === 'Rect' && (
                    <Rect
                        id={shape.id}
                        x={shape.x}
                        y={shape.y}
                        ref={( ref: any ) => ref && refs.push( ref )}
                        key={shape.id}
                        width={100}
                        height={100}
                        fill="red"
                        shadowBlur={10}
                        draggable
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                    />
                )
            }

        </>

    );
};