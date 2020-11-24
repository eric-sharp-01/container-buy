import AddButton from '../components/AddButton';
import ProductPopper from '../components/ProductPopper';


export default function getConfigs(){
    return [
        {
            field: "name",
            name: "Product Name",
            width: "40%",
            contentClasses: 'flex-left',
            headerClasses: 'center-header'
        }, 
        {
            field: "",
            name: "Infos",
            useComponent: true,
            component: ProductPopper
        },
        {
            field: "orderQtyAvail",
            name: "Available"
        },
        {
            field: "usdFOB",
            name: `USD FOB`
        },
        {
            field: "add",
            name: "Add to Container",
            width: "20%",
            headerClasses: 'center-header',
            useComponent: true,
            component: AddButton
        }
    ];
};