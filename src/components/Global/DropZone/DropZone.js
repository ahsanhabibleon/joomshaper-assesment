import React from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../../../itemTypes';
const style = {
    height: '100%',
    width: '100%'
};
const DropZone = (props) => {
    const [{ canDrop, isOver }, drop] = useDrop({
        accept: ItemTypes.BOX,
        drop: () => {
            return { name: 'DropZone' }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });
    const isActive = canDrop && isOver;
    let backgroundColor = '#222';
    if (isActive) {
        backgroundColor = 'darkgreen';
    }
    else if (canDrop) {
        backgroundColor = 'darkkhaki';
    }
    return (
        <div ref={drop} style={style} className={"dropzone " + (isActive ? 'is-active' : '')}>
            {isActive ? 'Release to drop' : 'Drag a box here'}
            {props.children}
        </div>
    );
};

export default DropZone
