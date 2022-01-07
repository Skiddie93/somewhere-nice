import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const Filter = (props) => {

const filters= Object.entries(props.filter)


    return (
        <div>
             <div className='filter'>
             <details>
            <summary>Filters</summary>
                        <FormGroup>
                            {filters.map(item=>{
                               const displayName = item[0].split('_').join(' ')

                                return(
                                    <FormControlLabel 
                                    control=
                                    {<Checkbox
                                    name={item[0]}
                                    onChange={props.filterHandler}
                                    checked={item[1].checked}
                                    sx={{
                                        color: '#114f37',
                                        '&.Mui-checked': {
                                          color: '#114f37',
                                        },
                                      }}
                                     />} 
                                    label={displayName} />

                                )
                            })}
                             
                        </FormGroup>
                        </details>
                        </div>
        </div>
    );
}

export default Filter;
