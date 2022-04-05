import React from 'react'
import { Box, Container, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import Title from './Title';

type CNT = [string, number]

const contents: CNT[] = [
  ['HTML', 5],
  ['CSS', 5],
  ['javascript', 4],
  ['React', 3],
  ['Wordpress', 3],
  ['Phothoshop', 4],
  ['Illustrator', 4],
  ['Premiere', 2],
  ['AfterEffect', 2],
]

const createData = (
  language: string,
  level: number,
) => (
  {
    language,
    level
  }
);


const datas = contents.map((content) => (createData(content[0], content[1])))

const Skills = () => {

  return (<>
    <Box sx={{ mt: 7, p: 1 }}>
      <Container maxWidth='sm'>
        <Title >主な IT スキル</Title>
        <Paper >
          <Table>
            <TableHead>
              <TableRow>
                {Object.keys(datas[0]).map((title) =>
                  <TableCell key={title} align='left' sx={{ fontWeight: 'bold' }}>{title === 'language' ? '言語／ツール' : '習熟度'}</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {datas.map((data, index) => (
                <TableRow key={index}>
                  <TableCell align='left'>{data.language}</TableCell>
                  <TableCell align='left'>
                    {[...new Array(data.level)].map((star, index) => (<StarIcon key={index} sx={{ color: 'primary.main' }} />))}
                    {[...new Array(5 - data.level)].map((star, index) => (<StarOutlineIcon key={index} sx={{ color: 'primary.main' }} />))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        <Typography variant='body1' sx={{ mt: 2 }}>
          [この他、業務で使用したことがある言語／ツール]<br />
          Github、Slack、Sourcetree、Bitbacket、vagrant、MySql、PHP、SCSS、RPG、SVN 等
        </Typography>
      </Container>
    </Box>
  </>)
}

export default Skills