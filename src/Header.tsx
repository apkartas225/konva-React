import React, {FC} from 'react';

interface Iprops {
    change: any
    options: String[]
} 

export const Header: FC<Iprops> = ( { options, change } ) => {
    return (
        <div className='wrapper'>
            <select onChange={change} placeholder='Choose shape'>
                {
                  options.map((el: any) => {
                    return <option value={el} key={el}>{el}</option>
                  })
                }
              
            </select>
        </div>

    );
};