'use client';

import { useState } from 'react';
import { Box, Tabs, Tab, Paper } from '@mui/material';
import GeneralInfo from '@/sections/ProfileView/GeneralInfo';
import PersonalInfo from '@/sections/ProfileView/PersonalInfo';
import LegalDocuments from '@/sections/ProfileView/LegalDocuments';


export default function ProfilePage() {
  const [tab, setTab] = useState(0);

  const renderContent = () => {
    switch (tab) {
      case 0:
        return <GeneralInfo />;
      case 1:
        return <PersonalInfo />;
      case 2:
        return <LegalDocuments />;
      default:
        return null;
    }
  };

  return (
    <Paper
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        bgcolor: '#fff',
      }}
    >
      {/* Tabs ثابتة */}
      <Tabs
        value={tab}
        onChange={(_, value) => setTab(value)}
        textColor="inherit"
        indicatorColor="primary"
        sx={{
          px: 3,
          borderBottom: '1px solid #E5E7EB',

          '& .MuiTabs-flexContainer': {
            justifyContent: 'flex-end',
          },

          '& .MuiTab-root': {
            minHeight: 56,
            fontWeight: 700,
            color: '#6B7280',
          },

          '& .Mui-selected': {
            color: '#111827',
          },
        }}
      >
        <Tab label="البيانات العامة" />
        <Tab label="البيانات الشخصية" />
        <Tab label="الأوراق القانونية" />
      </Tabs>

      {/* المحتوى المتغير */}
      <Box sx={{ p: 3 }}>
        {renderContent()}
      </Box>
    </Paper>
  );
}