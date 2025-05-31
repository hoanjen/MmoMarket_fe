import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Description from './Description';
import Review from './Review';
export default function SubProduct (
    {
        description,
        tab, 
        handleChange, 
    } 
    : 
    {
        description: string
        tab : string, 
        handleChange: (event: React.SyntheticEvent, value: string) => void,
    }){
    return (
        <>
            <Box sx={{ width: '100%', mt:4}}>
                <TabContext value={tab}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab sx={{width: '33.33%'}} label="Mô tả" value="detail" />
                            <Tab sx={{width: '33.33%'}}  label="Đánh giá" value="review" />
                            <Tab sx={{width: '33.33%'}}  label="Mua hàng qua api" value="api" />
                        </TabList>
                    </Box>
                    <TabPanel value="detail">
                        <Description description={description}/>
                    </TabPanel>
                    <TabPanel value="review">
                        <Review />
                    </TabPanel>
                    <TabPanel value="api">api</TabPanel>
                </TabContext>
            </Box>
        </>
    )
}