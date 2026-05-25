'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  Checkbox,
  Collapse,
  FormControl,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/dist/client/components/navigation';

type EmployeesProps = {
  mode?: 'create' | 'edit';
};

const roles = [
  'خدمة عملاء',
  'أمين مستودع',
  'موظف مبيعات',
  'محاسب',
  'مدير فرع',
  'كاشير',
  'مشرف عمليات',
  'مندوب توصيل',
];

function Employees({
  mode = 'create',
}: EmployeesProps) {
  const [isActive, setIsActive] = useState(true);
  const [openRoles, setOpenRoles] = useState(true);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [branch, setBranch] = useState('');
  const router = useRouter();
  const isEditMode = mode === 'edit';

  const pageTitle = isEditMode
    ? 'تعديل موظف'
    : 'إضافة موظف جديد';

  const submitButtonText = isEditMode
    ? 'تعديل'
    : 'حفظ';

  const toggleRole = (role: string) => {
    setSelectedRoles((prev) =>
      prev.includes(role)
        ? prev.filter((item) => item !== role)
        : [...prev, role]
    );
  };

  const handleSubmit = () => {
    if (isEditMode) {
      console.log('UPDATE EMPLOYEE');
      return;
    }

    console.log('CREATE EMPLOYEE');
  };

  return (
    <Box
      dir="rtl"
      sx={{
        minHeight: '100vh',
        bgcolor: '#F9F9F9',
        p: {
          xs: 2,
          md: 3,
          xl: 4,
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column-reverse',
            sm: 'row',
          },
          justifyContent: 'space-between',
          alignItems: {
            xs: 'stretch',
            sm: 'center',
          },
          gap: 2,
          mb: 4,
        }}
      >
        <Typography
          sx={{
            fontSize: {
              xs: '24px',
              md: '30px',
            },
            fontWeight: 600,
            color: '#1D1D1D',
          }}
        >
          {pageTitle}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            gap: 1.5,
          }}
        >
          <Button
            variant="outlined"
            sx={{
              height: 44,
              px: 3,
              borderRadius: '8px',
              borderColor: '#FF4D4D',
              color: '#FF4D4D',

              '&:hover': {
                borderColor: '#FF4D4D',
                bgcolor: '#FEF2F2',
              },
            }}
          >
            إلغاء
          </Button>

          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              height: 44,
              px: 3,
              borderRadius: '8px',
              bgcolor: '#886CE8',
              boxShadow: 'none',

              '&:hover': {
                bgcolor: '#765BC7',
                boxShadow: 'none',
              },
            }}
          >
            {submitButtonText}
          </Button>
        </Box>
      </Box>

      {/* Content */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            xl: '1fr 1fr',
          },
          gap: 3,
        }}
      >
        {/* Right Card */}
        <Card
          sx={{
            borderRadius: '16px',
            p: {
              xs: 2.5,
              md: 3.5,
            },
            boxShadow:
              '0px 1px 3px rgba(16,24,40,0.08)',
          }}
        >
          <Stack spacing={2.5}>
            <Box>
              <Typography
                sx={{
                  mb: 1,
                  fontSize: '14px',
                  color: '#1D1D1D',
                }}
              >
                الاسم
              </Typography>

              <TextField
                fullWidth
                placeholder="الاسم الأول"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    height: 48,
                    borderRadius: '12px',
                    bgcolor: '#F2F4F7',

                    '& fieldset': {
                      border: 'none',
                    },
                  },
                }}
              />
            </Box>

            <Box>
              <Typography
                sx={{
                  mb: 1,
                  fontSize: '14px',
                }}
              >
                رقم الهاتف
              </Typography>

              <TextField
                fullWidth
                placeholder="رقم الهاتف"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    height: 48,
                    borderRadius: '12px',
                    bgcolor: '#F2F4F7',

                    '& fieldset': {
                      border: 'none',
                    },
                  },
                }}
              />
            </Box>

            <Box>
              <Typography
                sx={{
                  mb: 1,
                  fontSize: '14px',
                }}
              >
                البريد الإلكتروني
              </Typography>

              <TextField
                fullWidth
                placeholder="البريد الإلكتروني"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    height: 48,
                    borderRadius: '12px',
                    bgcolor: '#F2F4F7',

                    '& fieldset': {
                      border: 'none',
                    },
                  },
                }}
              />
            </Box>

            <Box>
              <Typography
                sx={{
                  mb: 1,
                  fontSize: '14px',
                }}
              >
                الفرع
              </Typography>

              <FormControl fullWidth>
                <Select
                  displayEmpty
                  value={branch}
                  onChange={(e) =>
                    setBranch(
                      e.target.value as string
                    )
                  }
                  sx={{
                    height: 48,
                    bgcolor: '#F2F4F7',
                    borderRadius: '12px',

                    '& fieldset': {
                      border: 'none',
                    },
                  }}
                >
                  <MenuItem value="">
                    الفرع
                  </MenuItem>

                  <MenuItem value="1">
                    الفرع الأول
                  </MenuItem>

                  <MenuItem value="2">
                    الفرع الثاني
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent:
                  'space-between',
                pt: 1,
              }}
            >
              <Typography
                sx={{
                  fontWeight: 500,
                  color: '#1D1D1D',
                }}
              >
                الحالة
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <Typography
                  sx={{
                    fontSize: '14px',
                    color: '#667085',
                  }}
                >
                  تفعيل
                </Typography>

                <Switch
                  checked={isActive}
                  onChange={() =>
                    setIsActive(!isActive)
                  }
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked':
                      {
                        color: '#fff',
                      },

                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track':
                      {
                        bgcolor: '#22C55E',
                      },
                  }}
                />
              </Box>
            </Box>
          </Stack>
        </Card>

        {/* Left Side */}
        <Box>
          <Stack spacing={3}>
            {/* Upload */}
            <Card
              sx={{
                borderRadius: '16px',
                p: {
                  xs: 3,
                  md: 4,
                },
                boxShadow:
                  '0px 1px 3px rgba(16,24,40,0.08)',
              }}
            >
              <Typography
                sx={{
                  mb: 3,
                  color: '#1D1D1D',
                }}
              >
                الصورة
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent:
                    'center',
                }}
              >
                <Box
                  sx={{
                    width: 144,
                    height: 144,
                    borderRadius: '50%',
                    border:
                      '2px dashed #D0D5DD',
                    display: 'flex',
                    justifyContent:
                      'center',
                    alignItems: 'center',
                  }}
                >
                  <Button
                    sx={{
                      width: 128,
                      height: 128,
                      borderRadius: '50%',
                      bgcolor: '#F9FAFB',
                      color: '#98A2B3',
                      textTransform:
                        'none',

                      '&:hover': {
                        bgcolor: '#F3F4F6',
                      },
                    }}
                  >
                    Upload photo
                  </Button>
                </Box>
              </Box>
            </Card>

            {/* Roles */}
            <Card
              sx={{
                borderRadius: '16px',
                p: 2.5,
                boxShadow:
                  '0px 1px 3px rgba(16,24,40,0.08)',
              }}
            >
              <Typography
                sx={{
                  mb: 2,
                  color: '#1D1D1D',
                }}
              >
                الدور
              </Typography>

              <Box
                sx={{
                  bgcolor: '#F2F4F7',
                  borderRadius: '12px',
                  overflow: 'hidden',
                }}
              >
                <Button
                  fullWidth
                  onClick={() =>
                    setOpenRoles(
                      !openRoles
                    )
                  }
                  sx={{
                    height: 48,
                    px: 2,
                    justifyContent:
                      'space-between',
                    color: '#667085',
                    textTransform:
                      'none',
                  }}
                >
                  الدور
                </Button>

                <Collapse in={openRoles}>
                  <Box
                    sx={{
                      borderTop:
                        '1px solid #EAECF0',
                      maxHeight: 260,
                      overflowY:
                        'auto',
                    }}
                  >
                    {roles.map(
                      (role) => (
                        <Box
                          key={role}
                          sx={{
                            display:
                              'flex',
                            alignItems:
                              'center',
                            justifyContent:
                              'space-between',
                            p: 2,

                            '&:hover':
                              {
                                bgcolor:
                                  '#F9FAFB',
                              },
                          }}
                        >
                          <Typography
                            sx={{
                              fontWeight:
                                500,
                              color:
                                '#1D1D1D',
                            }}
                          >
                            {role}
                          </Typography>

                          <Checkbox
                            checked={selectedRoles.includes(
                              role
                            )}
                            onChange={() =>
                              toggleRole(
                                role
                              )
                            }
                            sx={{
                              color:
                                '#886CE8',

                              '&.Mui-checked':
                                {
                                  color:
                                    '#886CE8',
                                },
                            }}
                          />
                        </Box>
                      )
                    )}
                  </Box>

                  <Box
                    sx={{
                      borderTop:
                        '1px solid #EAECF0',
                      p: 2,
                    }}
                  >
                    <Button
                    onClick={()=> {router.push('/employees/custom')}}
                      sx={{
                        color:
                          '#0073E6',
                        textTransform:
                          'none',
                        fontWeight:
                          500,
                      }}
                    >
                      مخصص
                    </Button>
                  </Box>
                </Collapse>
              </Box>
            </Card>
          </Stack>
        </Box>
      </Box>

      <Box
        sx={{
          mt: 4,
          display: 'flex',
          justifyContent:
            'flex-start',
        }}
      >
        <Button
          sx={{
            height: 44,
            px: 3,
            bgcolor: '#FFF',
            color: '#1D1D1D',
            borderRadius: '8px',
            boxShadow:
              '0px 1px 3px rgba(16,24,40,0.08)',

            '&:hover': {
              bgcolor: '#F9FAFB',
            },
          }}
        >
          التالي
        </Button>
      </Box>
    </Box>
  );
}

export default Employees;