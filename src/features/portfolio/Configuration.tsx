import React from 'react'
import { Box, Container, Typography } from '@mui/material'
import { styled } from '@mui/system'
import Title from './Title';

const ResponsiveImage = styled('img')({
  width: '100%',
  height: 'auto',
});


const Configuration = () => {
  return (
    <>
      <Container sx={{ mt: 15, px: 2 }}>
        <Title>システム構成図</Title>
        <Typography sx={{ mb: 5, px: 2 }} variant='body1' align='left' paragraph>
          このWebページは上記の学習で学んだことをもとに、AWS、Python DjangoREST Framework、Firebase Hosting 等のツールを使用して作成しています。作成したソースは Github に保存しています。ヘッダーバーの Github アイコンよりご確認ください。
        </Typography>

        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          <ResponsiveImage src='./media/xs_config.png' />
        </Box>
        <Box sx={{ display: { xs: 'none', sm: 'block', lg: 'none' } }}>
          <ResponsiveImage src='./media/md_config.png' />
        </Box>
        <Box sx={{ display: { xs: 'none', lg: 'block', } }}>
          <ResponsiveImage src='./media/lg_config.png' />
        </Box>
      </Container>
    </>
  )
}

export default Configuration