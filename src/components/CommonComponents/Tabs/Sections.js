import { Box } from "@mui/material";

import Tab from './StyledTab';
import Tabs from './StyledTabs';

export default function Sections({ value, setValue, setNewValue=true ,sections, valueToCallbackMapping }) {


    const handleChange = (_, newValue) => {
        let callback = valueToCallbackMapping?.[newValue];
        if (callback) {
            callback();
        }
        if (setNewValue) {
            setValue(newValue);
        }
        
    };

    return (
        sections && (
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        {sections.map((section, index) => (
                            <Tab label={section?.name} key={index} />
                        ))}
                    </Tabs>
                </Box>
            </Box>
        )
    );
}