import { Container, Typography } from '@mui/material'
import React from 'react'

const Introduction = () => {
  return (<>
    <Container sx={{ mt: 8, px: 2 }} >
      <Typography variant='h6' align='left'>
        このWebページをご覧いただきましてありがとうございます。<br />
        私は今までHTML、CSSを使用してWebページを作成する仕事を主に行ってきました。Googleのマテリアルデザインシステムに興味を持ったことで Mui や React のことを知り、javascript、Reactを使用した仕事に就きたいと考えるようになり、現在、求職活動しています。<br />
        webページ作成のためにjavascriptを業務で使用した経験がありますが、React や vue等のjavascriptフレームワークを業務で使用した経験はありません。スキルアップのために独学で javascript、Typescript、React を学んでいます。<br />
        どうぞよろしくお願いいたします。
      </Typography>
    </Container>
  </>
  )
}

export default Introduction