import { SvgIcon } from '@mui/material';

import { ReactComponent as BrandLogoSvg } from '../../../smile-sales-logo-light-theme-edit.svg';

export default function BrandLogo() {
    return (
        <SvgIcon component={BrandLogoSvg} inheritViewBox
            sx={{ width: "120px", height: "70px" }}
        />
    );
}