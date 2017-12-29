import React from 'react';
import { pad } from '../../utils';

export const ServantTotalMaterialTable = ({materials}) => (
    <div>
        <table>
            <thead>
                <th>Material</th>
            </thead>
            <tbody>
                {
                    Object.keys(materials).map(key => {
                    
                        return (
                            <tr>
                                <td>
                                    <img height="64px" width="64px" src={`/public/assets/items/${pad(+key)}.png`}/>
                                    <p>{`x${materials[key]}`}</p>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    </div>
)

export default ServantTotalMaterialTable;