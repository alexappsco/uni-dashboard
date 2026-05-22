'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  Stack,
  Typography,
} from '@mui/material';

const pages = [
  'الصفحة الرئيسية',
  'الفروع',
  'إدارة الباقات',
  'العملاء',
  'الأصناف المميزة',
  'إدارة الموظفين',
  'الملف الشخصي',
  'المحفظة',
];

type PermissionType = {
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
};

function Custom() {
  const [permissions, setPermissions] = useState<
    Record<string, PermissionType>
  >(
    pages.reduce(
      (acc, page) => ({
        ...acc,
        [page]: {
          view: false,
          create: false,
          edit: false,
          delete: false,
        },
      }),
      {} as Record<string, PermissionType>
    )
  );

  const togglePermission = (
    page: string,
    action: keyof PermissionType
  ) => {
    setPermissions((prev) => ({
      ...prev,
      [page]: {
        ...prev[page],
        [action]: !prev[page][action],
      },
    }));
  };

  return (
    <Box
      dir="rtl"
      sx={{
        minHeight: '100vh',
        backgroundColor: '#F9F9F9',
        p: {
          xs: 2,
          md: 4,
        },
      }}
    >
      {/* Header */}
      <Stack
        direction={{
          xs: 'column-reverse',
          md: 'row',
        }}
        spacing={2}
        sx={{
          justifyContent: 'space-between',
          alignItems: {
            xs: 'stretch',
            md: 'center',
          },
          mb: 4,
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: {
              xs: '24px',
              md: '38px',
            },
            color: '#1D1D1D',
          }}
        >
          إضافة موظف جديد مخصص
        </Typography>

        <Stack direction="row" sx={{ gap: 2 }}>
          <Button
            variant="outlined"
            sx={{
              borderColor: '#FF4D4D',
              color: '#FF4D4D',
              px: 4,
              borderRadius: '10px',
             

              '&:hover': {
                borderColor: '#FF4D4D',
                backgroundColor: '#FFF5F5',
              },
            }}
          >
            إلغاء
          </Button>

          <Button
            variant="contained"
            sx={{
              backgroundColor: '#886CE8',
              px: 4,
              borderRadius: '10px',

              '&:hover': {
                backgroundColor: '#7758E7',
              },
            }}
          >
            حفظ
          </Button>
        </Stack>
      </Stack>

      {/* Permissions Card */}
      <Card
        sx={{
          borderRadius: '24px',
          p: 3,
          boxShadow: '0px 2px 12px rgba(0,0,0,0.05)',
        }}
      >
        <Typography
          sx={{
            fontSize: '20px',
            fontWeight: 600,
            mb: 3,
          }}
        >
          الصلاحيات
        </Typography>

        {/* Header */}
        <Box
          sx={{
            backgroundColor: '#F4F6F8',
            borderRadius: '14px',
            px: 3,
            py: 2,
            display: 'flex',
            justifyContent: 'space-between',
            mb: 1,
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
            }}
          >
            الصفحات
          </Typography>

          <Typography
            sx={{
              fontWeight: 600,
            }}
          >
            الصلاحيات
          </Typography>
        </Box>

        {/* Rows */}
        {pages.map((page, index) => (
          <React.Fragment key={page}>
            <Box
              sx={{
                px: 3,
                py: 2.5,
                display: 'flex',
                flexDirection: {
                  xs: 'column',
                  lg: 'row',
                },
                justifyContent: 'space-between',
                alignItems: {
                  xs: 'flex-start',
                  lg: 'center',
                },
                gap: 2,
              }}
            >
              {/* Page Name */}
              <Typography
                sx={{
                  minWidth: {
                    lg: 220,
                  },
                  fontWeight: 500,
                  color: '#344054',
                }}
              >
                {page}
              </Typography>

              {/* Permissions */}
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 4,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Checkbox
                    checked={permissions[page].view}
                    onChange={() =>
                      togglePermission(page, 'view')
                    }
                    sx={{
                      color: '#886CE8',

                      '&.Mui-checked': {
                        color: '#886CE8',
                      },
                    }}
                  />

                  <Typography>
                    عرض
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Checkbox
                    checked={permissions[page].create}
                    onChange={() =>
                      togglePermission(page, 'create')
                    }
                    sx={{
                      color: '#886CE8',

                      '&.Mui-checked': {
                        color: '#886CE8',
                      },
                    }}
                  />

                  <Typography>
                    إضافة
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Checkbox
                    checked={permissions[page].edit}
                    onChange={() =>
                      togglePermission(page, 'edit')
                    }
                    sx={{
                      color: '#886CE8',

                      '&.Mui-checked': {
                        color: '#886CE8',
                      },
                    }}
                  />

                  <Typography>
                    تعديل
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Checkbox
                    checked={permissions[page].delete}
                    onChange={() =>
                      togglePermission(page, 'delete')
                    }
                    sx={{
                      color: '#886CE8',

                      '&.Mui-checked': {
                        color: '#886CE8',
                      },
                    }}
                  />

                  <Typography>
                    حذف
                  </Typography>
                </Box>
              </Box>
            </Box>

            {index !== pages.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </Card>

      {/* Previous Button */}
      <Box
        sx={{
          mt: 3,
          display: 'flex',
          justifyContent: 'flex-start',
        }}
      >
        <Button
          variant="text"
          sx={{
            color: '#1D1D1D',
            fontWeight: 600,
          }}
        >
          السابق
        </Button>
      </Box>
    </Box>
  );
}

export default Custom;