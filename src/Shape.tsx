import React, { FC } from 'react';
import { Star, Rect, } from "react-konva";


interface ShapeProps {
    handleDragStart: any;
    handleDragEnd: any;
    refs: any;
    shapes: ShapeItem[];
    typeOfShape: String;
    children: any;
    rects: ShapeItem[];
}
interface ShapeItem {
    id: string;
    x: number;
    y: number;
    rotation: number;
    isDragging: boolean;
    typeOfShape: String;
}

export const Shape: FC<ShapeProps> = ( { handleDragStart, handleDragEnd, refs, shapes, rects, typeOfShape } ) => {

    return (
        <>
            {shapes.map( ( element: any, i: any ) => {
                return <Star
                    key={element.id}
                    id={element.id}
                    x={element.x}
                    y={element.y}
                    ref={( ref: any ) => ref && refs.push( ref )}
                    numPoints={5}
                    innerRadius={20}
                    outerRadius={40}
                    fill="#89b717"
                    opacity={0.8}
                    draggable
                    rotation={element.rotation}
                    shadowColor="black"
                    shadowBlur={10}
                    shadowOpacity={0.6}
                    shadowOffsetX={element.isDragging ? 10 : 5}
                    shadowOffsetY={element.isDragging ? 10 : 5}
                    scaleX={element.isDragging ? 1.2 : 1}
                    scaleY={element.isDragging ? 1.2 : 1}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                />;
            }
            )
            }

            {
                rects.map( ( el: any, i: any ) => {
                    return <Rect
                        id={el.id}
                        x={el.x}
                        y={el.y}
                        ref={( ref: any ) => ref && refs.push( ref )}
                        key={el.id}
                        width={100}
                        height={100}
                        fill="red"
                        shadowBlur={10}
                        draggable
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                    />;
                }

                )
            }
        </>

    );
};