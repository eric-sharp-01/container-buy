import React from 'react';

export default function getConfigs(to){
    return [
        {
            field: "index",
            name: "#",
            headerClasses: 'center-header',
            contentClasses: 'center-header'
        }, 
        {
            field: "name",
            name: "Item Name",
            width: "30%",
            contentClasses: 'flex-left',
            headerClasses: 'center-header'
        },
        {
            field: "quantity",
            name: "Quantity",
            contentClasses: 'flex-right'
        },
        {
            field: "conRate",
            name: "Con. Rate",
            contentClasses: 'flex-right'
        },
        {
            field: "volume",
            name: "Volume",
            contentClasses: 'flex-right'
        },
        {
            field: "usdFOB",
            name: `USD FOB`,
            contentClasses: 'flex-right'
        },
        {
            field: "usdTotal",
            name: `USD total`,
            contentClasses: 'flex-right'
        },
        {
            field: "localFOB",
            name: `${to} FOB`,
            contentClasses: 'flex-right'
        },
        {
            field: "localTotal",
            name: `${to} total`,
            contentClasses: 'flex-right'
        },
        {
            field: "estCostIncl",
            name: `Est. Cost Incl. GST Fee ${to}`,
            contentClasses: 'flex-right'
        }
    ];
};

export function getProperties(to, rate){
    let getter = (value) => {
        return <div className="property-value">
            <span className="customer-blue">{`USD ${value}/`}</span>
            <span className="customer-green">{`${to} ${(value * rate).toFixed(2)}`}</span>
        </div>;
    }

    let propertyNames = [
        {
            name: "Currency",
            field: "currency",
            getter: value => <span className="customer-blue">{value}</span>
        },
        {
            name: `Currency ${to}`,
            field: "currencyRate",
            getter: value => <span className="customer-blue">{value}</span>
        },
        {
            name: "GST Rate",
            field: "gstRate",
            getter: value => <span className="customer-blue">{value}</span>
        },
        {
            name: "Container Size",
            field: "conSize",
            getter: value => <span className="customer-blue">{value}</span>
        },
        {
            name: "Internatinal Freight",
            field: "internationalFreightUsd",
            getter
        },
        {
            name: "Total Volume",
            field: "totalVolume",
            getter: value => <span className="customer-blue">{value}</span>
        },
        {
            name: "Clearance Cost",
            field: "clearanceCostUsd",
            getter
        },
        {
            name: "GST",
            field: "gstUsd",
            getter
        },
        {
            name: "Local Freight",
            field: "localFreightUsd",
            getter
        },
        {
            name: "Total Quantity",
            field: "qty",
            getter: value => value
        },
        {
            name: "Tyres Subtotal",
            field: "tyresSubTotalUsd",
            getter
        },
        {
            name: "Fee & GST Summary",
            field: "feeGstSummaryUsd",
            getter
        },
        {
            name: "30% Deposit",
            field: "depositUsd",
            getter
        },
        {
            name: "70% Remaining",
            field: "remaining",
            getter
        },
        {
            name: "Total Price",
            field: "totalPriceUsd",
            getter
        }
    ]
    return propertyNames;
}