import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      hidden={value !== index}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'white'
  },
  flexContainer: {
    borderBottom: "2px solid #ececec"
  }
}));

export default function SimpleTabs(props) {
  const [value, setValue] = React.useState(0);
  let tabs = props.tabs.map((t, i) => {
    return <TabPanel key={i} value={value} index={i}>{t}</TabPanel>;
  })

  const { currentTabIndex, tabIndexChange } = props;
  let tabTitles = props.tabTitles.map((t, i) => {
    return <Tab label={t} key={i} style={{textTransform: 'none'}} {...a11yProps(i)} />;
  })
  
  let classes = useStyles();

  const handleChange = (e, newValue) => {
    setValue(newValue);
    if(tabIndexChange){
      tabIndexChange(newValue);
    }
  }

  useEffect(() => {
    setValue(currentTabIndex || 0);
  }, [currentTabIndex])
  return (
    <div>
      <Tabs value={value} onChange={handleChange} classes={classes}>
        {tabTitles}
      </Tabs>
      {tabs}
    </div>
  );
}