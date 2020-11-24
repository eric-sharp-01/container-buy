import DeleteButton from '../components/DeleteButton';
import NumberInput from '../components/NumberInput';

export default function getConfigs(from, to, containerSize, rate, feesAndGstSummary, totalQuantity){
    return [
        {
            field: "name",
            name: "Name",
            width: "15%",
            contentClasses: 'flex-left',
            headerClasses: 'center-header'
        }, 
        {
            field: "qty",
            name: "QTY",
            useComponent: true,
            component: NumberInput
        }, 
        {
            field: "",
            name: "Con. Rate",
            getter: (item) => {
                switch(containerSize){
                    case 20:
                        return item.vol20;
                    case 40:
                        return item.vol40;
                    default:
                        return 0;
                }
            },
            contentClasses: 'flex-right'
        }, 
        {
            field: "",
            name: "Volume",
            getter: (item) => {
                let conRate = 0;
                switch(containerSize){
                    case 20:
                        conRate = item.vol20;
                        break;
                    case 40:
                        conRate = item.vol40;
                        break;
                    default:
                        break;
                }
                return (item.qty * conRate).toFixed(2) + "%";
            },
            contentClasses: 'flex-right'
        }, 
        {
            field: "usdFOB",
            name: `${from} FOB`,
        }, 
        {
            field: "",
            name: `${from} Total`,
            getter: (item) => {
                return (item.qty * item.usdFOB).toFixed(2);
            },
            contentClasses: 'flex-right'
        },
        {
            field: "",
            name: `${to} FOB`,
            getter: (item) => {
                return (item.usdFOB * rate).toFixed(2);
            },
            contentClasses: 'flex-right'
        }, 
        {
            field: "",
            name: `${to} Total`,
            getter: (item) => {
                return (item.usdFOB * rate * item.qty).toFixed(2);
            },
            contentClasses: 'flex-right'
        }, 
        {
            field: "",
            name: `Est. Cost Incl. GST Fee ${to}`,
            getter: (item) => {
                return item.qty ? (feesAndGstSummary / totalQuantity + item.usdFOB * rate).toFixed(2) : 0;
            },
            headerClasses: "font-size-12",
            contentClasses: 'flex-right'
        },
        {
            field: "delete",
            name: "Delete",
            useComponent: true,
            component: DeleteButton,
            headerClasses: 'center-header'
        }
    ];
};

export let emptyCart = "Container is still empty";
