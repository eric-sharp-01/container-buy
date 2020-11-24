import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core';

let useStyles = makeStyles(theme => ({
    table: {
        border: "1px solid #c4c4c4",
        display: "flex", 
        flexDirection: "column",
        position: "relative",
        borderTop: "none"
    },
    header: {
        background: "#F2F2F2",
        color: "#666666",
        fontWeight: "bold",
        padding: "15px",
        position: "sticky",
        top: 0,
        zIndex: 1002,
        borderTop: "1px solid #c4c4c4"
    },
    row: {
        background: "white",
        color: "black",
        padding: "10px 15px"
    },
    column: {
        background: "white",
        color: "#666666",
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center",
        overflow: "hidden"
    },
    pagination: {
        display: "flex",
        justifyContent: "center",
        paddingBottom: 15
    },
    alignRightArea: {
        textAlign: 'right',
        justifyContent: 'flex-end'
    }
}));

const Table = (props) => {
    const { data, configs, total, update, paging = true} = props;
    let classes = useStyles();
    const [currentPage, setCurrentPage] = useState(1);
    if(!data || !configs){
        return "Invalid data or configuration";
    }
    const changePage = (e, pageNumber) => {
        setCurrentPage(pageNumber);
        let q = {page: currentPage};
        update(q);
    }
    let perPage = 20;
    let headerItems = configs.map((item, index) => {
        return <Box key={index} className={item.headerClasses || classes.alignRightArea} flexBasis={item.width || 0} flexGrow={item.width ? 0 : 1} paddingRight="5px">{item.name}</Box>
    });
    let header = <Box key={-1} display="flex" className={classes.header}>{headerItems}</Box>;
    let rows = data.map((dataRow, index) => {
        let row = configs.map((item, k) => {
            let value = item.field ? dataRow[item.field] 
            : item.getter 
                ? item.getter(dataRow) : "";
            let column = null;
            if(item.useComponent){
                let Component = item.component;
                column = (<Box key={k} paddingRight="5px" className={`${classes.column} ${item.contentClasses || classes.alignRightArea}`} flexBasis={item.width || 0} flexGrow={item.width ? 0 : 1}>
                    <Component row={dataRow} config={item} value={value} />
                </Box>);
            }else{
                column = <Box key={k} className={`${classes.column} ${item.contentClasses || classes.alignRightArea}`} paddingRight="5px" flexBasis={item.width || 0} flexGrow={item.width ? 0 : 1} paddingX="5px">
                    {value}
                </Box>;
            }
            return column;
        });
        return <Box key={index} display="flex" className={classes.row}>{row}</Box>;
    });
    let rowContainer = <Box>{rows}</Box>;
    let totalCount = total || data.length;

    let pagination = Boolean(totalCount && paging) ? <Pagination 
        className={classes.pagination} 
        count={Math.ceil(totalCount / perPage)} 
        onChange={changePage} 
        page={currentPage} 
        color="primary" 
    /> : null;
    
    return (
        <Box className={classes.table}>
            {header}
            {rowContainer}
            {pagination}
        </Box>
    );
}

export default Table;