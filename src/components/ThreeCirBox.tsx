import {Box, Text} from 'native-base'
import React, {FC} from 'react'

interface ThreeCirBoxModel {
  Title?: string
  sTitle?: string
}

export const ThreeCirBox: FC<ThreeCirBoxModel> = ({Title, sTitle}) => {
  return (
    <Box bg={'black'} h={220} overflow={'hidden'}>
      <Box
        bg={'#00699B'}
        h={800}
        rounded={300}
        w={800}
        position={'absolute'}
        top={-220}
        left={-150}></Box>
      <Box
        bg={'#0090D3'}
        h={500}
        rounded={300}
        w={500}
        position={'absolute'}
        top={-260}
        left={-180}></Box>
      <Box
        bg={'#00AEFF'}
        h={300}
        rounded={300}
        w={300}
        position={'absolute'}
        top={-160}
        left={-100}></Box>
      <Box p={5}>
        <Text
          fontSize={30}
          fontWeight={700}
          color={'white'}
          w={'65%'}
          mt={'60px'}>
          {Title}
        </Text>
        <Text fontSize={15} fontWeight={400} color={'white'} mt={2}>
          {sTitle}
        </Text>
      </Box>
    </Box>
  )
}
