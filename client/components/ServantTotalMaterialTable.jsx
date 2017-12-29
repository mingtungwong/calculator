import React from 'react';
import { pad } from '../../utils';

export const ServantTotalMaterialTable = ({materials, qp}) => (
    <div>
        <table>
            <thead>
                <tr>
                    <th>Material</th>
                </tr>
            </thead>
            <tbody>
                {
                    Object.keys(materials).map(key => 
                        (
                            <tr key={key}>
                                <td className="mat-rows">
                                    <img height="64px" width="64px" src={`/public/assets/items/${pad(+key)}.png`}/>
                                    <p className="mat-quantity">{`x${materials[key]}`}</p>
                                </td>
                            </tr>
                        )
                    )
                }
                <tr height="64px">
                    <td className="qp-cost">{`QP x${qp}`}</td>
                </tr>
            </tbody>
        </table>
    </div>
)

export default ServantTotalMaterialTable;