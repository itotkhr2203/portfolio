import React from 'react';
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, } from '@mui/material';
import MateLink from '@mui/material/Link';
import Title from './Title';
import { styled } from '@mui/system';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Link } from 'react-router-dom';


const createData = (
  courseName: string,
  react: string,
  hooks: string,
  redux: string,
  django: string,
  javascript: string,
  typescript: string,
  output: string,
  url: string,
) => {
  return {
    courseName,
    react,
    hooks,
    redux,
    django,
    javascript,
    typescript,
    output,
    url,
  }
}

const datas = [
  createData('[基礎編]React Hooks + Django REST Framework API でフルスタックWeb開発', '●', '●', '', '●', '●', '', '', '',),
  createData('[JIRA編]React Hooks/TypeScript + Django REST APIで作るオリジナルJIRA', '●', '●', '●', '●', '●', '●', '有', '#',),
  createData('最速で学ぶFirebase + React Hooks (TypeScript)', '●', '●', '', '', '●', '●', '', '',),
  createData('High Performance React Web 開発', '●', '●', '●', '●', '●', '●', '', '',),
  createData('React Hooks 入門 - HooksとReduxを組み合わせて最新のフロントエンド状態管理手法を習得', '●', '●', '●', '●', '●', '●', '', '',),
  createData('[Redux編] Redux Tool KitとReact HooksによるモダンReact フロントエンド開発', '●', '●', '●', '●', '●', '', '', '',),
  createData('APIを基礎からしっかりと学び、Django Rest Frameworkで天気情報を取得するアプリを作ろう！', '', '', '', '●', '●', '', '', '',),
  createData('Python + Django3 Djangoを基礎から応用まで、アプリケーション開発マスターpython付き', '', '', '', '●', '', '', '', '',),
  createData('モダンJavaScriptの基礎から始める挫折しないためのReact入門', '●', '●', '', '', '●', '', '', '',),
  createData('Reactに入門した人のためのもっとReactが楽しくなるステップアップコース完全版', '●', '●', '', '', '●', '●', '', '',),
  createData('ハンズオンで学ぶTypeScript - JavaScript エンジニアのためのTypeScript徹底入門', '●', '', '', '', '●', '●', '', '',),
  createData('最速で学ぶTypeScript', '●', '', '', '', '●', '●', '', '',),
  createData('【JS】ガチで学びたい人のためのJavaScriptメカニズム', '', '', '', '', '●', '', '', '',),
  createData('Firebase + React Hooks(TypeScript)によるWebアプリ開発', '●', '●', '', '', '●', '●', '', '',),
]

const Learning = () => {

  const VerticalTC = styled(TableCell)({
    // writingMode: 'vertical-lr',
    // width: '50px',
    lineHeight: '1',
    textAlign: 'center',
  })

  const CustomLink = styled(MateLink)({
    color: 'rgb(85, 26, 139)',
    fontWeight: 'bold'
  })


  return (
    <>
      <Container sx={{ mt: 15, px: 2 }}>
        <Title>React、javascript に関する学習記録</Title>
        <Typography sx={{ mb: 5, px: 2 }} variant='body1' align='left' paragraph>
          学習サイトの『 <CustomLink href='https://www.udemy.com/' target='_blank'>Udemy<OpenInNewIcon sx={{ fontSize: '15px' }} /></CustomLink> 』で javascript と React について学んでいます。下記表の成果物欄に印がついているものは、リンクからコースで作成した成果物をご覧いただけます。よろしければご確認ください。
        </Typography>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 440 }} >
            <Table size='small' >
              <TableHead sx={{ position: 'sticky', top: 0, backgroundColor: '#f9e1db' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', minWidth: 300 }} rowSpan={2}>コース</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', }} colSpan={6}>学習言語／ツール</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} rowSpan={2} >成果物</TableCell>
                </TableRow>
                <TableRow sx={{ borderBottom: 'none' }}>
                  <VerticalTC>React</VerticalTC>
                  <VerticalTC>Hooks</VerticalTC>
                  <VerticalTC>Redux</VerticalTC>
                  <VerticalTC>Django</VerticalTC>
                  <VerticalTC>javascript</VerticalTC>
                  <VerticalTC>Typescript</VerticalTC>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  datas.map((data, index) => {
                    return (
                      <TableRow key={index}>
                        {
                          data.output
                            ? <TableCell><Link to="/auth">{data.courseName}</Link></TableCell>
                            : <TableCell>{data.courseName}</TableCell>
                        }
                        <VerticalTC>{data.react}</VerticalTC>
                        <VerticalTC>{data.hooks}</VerticalTC>
                        <VerticalTC>{data.redux}</VerticalTC>
                        <VerticalTC>{data.django}</VerticalTC>
                        <VerticalTC>{data.javascript}</VerticalTC>
                        <VerticalTC>{data.typescript}</VerticalTC>
                        <TableCell align='center'>{data.output}</TableCell>
                      </TableRow>
                    )
                  })
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </>
  )
}

export default Learning