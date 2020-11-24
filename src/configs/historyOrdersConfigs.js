import ViewButton from '../components/ViewButton';
import ColorfulTag from '../components/ColorfulTag';
import ColorfulStatus from '../components/ColorfulStatus';
import BlueBoldText from '../components/BlueBoldText';

export default function getConfigs(){
    return [
        {
            field: "index",
            name: "#"
        }, 
        {
            field: "id",
            name: "Action",
            useComponent: true,
            component: ViewButton
        },
        {
            field: "refNumber",
            name: "Reference",
            contentClasses: 'flex-left'
        },
        {
            field: "tag",
            name: "Tag",
            useComponent: true,
            component: ColorfulTag
        },
        {
            field: "status",
            name: "Status",
            useComponent: true,
            component: ColorfulStatus
        },
        {
            field: "date",
            name: "Date"
        },
        {
            field: "qty",
            name: "QTY.",
            useComponent: true,
            component: BlueBoldText
        },
        {
            field: "amount",
            name: "Amount",
            useComponent: true,
            component: BlueBoldText
        },
        {
            field: "deposit",
            name: "30% Deposit"
        },
        {
            field: "remaining",
            name: "70% Remaining"
        },
        {
            field: "currency",
            name: "Currency"
        },
        {
            field: "conSize",
            name: "Con. Size"
        }
    ];
};