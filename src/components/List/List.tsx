import React from 'react';

export interface ListProps<T>{
    ListArr: T[],
    renderItem: (item: T, ind?: number) => React.ReactNode | React.ReactChild,
    children?: any,
}

function List<T> ({ListArr, renderItem, children}: ListProps<T>)  {
    return (
        <>
            {children}
            {(ListArr.map(renderItem))}
        </>
    );
};

export default List;