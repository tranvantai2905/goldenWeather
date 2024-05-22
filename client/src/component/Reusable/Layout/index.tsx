import { Grid, SxProps, Theme } from '@mui/material';
import React, { ReactNode } from 'react';
import SectionHeader from '../SectionHeader';

interface LayoutProps {
  content: ReactNode;
  title: string;
  sx?: SxProps<Theme>;
  mb?: string | number;
  sectionSubHeader?: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ content, title, sx, mb, sectionSubHeader }) => {
  return (
    <Grid container sx={sx}>
      <Grid item xs={12}>
        <SectionHeader title={title} mb={mb || '0'} />
        {sectionSubHeader || null}
      </Grid>
      {content}
    </Grid>
  );
};

export default Layout;
