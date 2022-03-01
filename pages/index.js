import React from 'react';
import Link from 'next/link'
import { Container, Box, Paper, List, ListItem, Divider, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Web3 from 'web3';

export default function Home() {

  const [loading, setLoading] = React.useState(true);
  const [blockNumbers, setBlockNumbers] = React.useState([]);

  React.useEffect(() => {
    handleRefresh();
    // setBlocks
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
    web3.eth.getBlockNumber().then(lastNumber => {
      let _blockNumbers = [];
      for (let i = 0; i < 10; i++) {
        _blockNumbers.push(lastNumber - i);
      }
      setBlockNumbers(_blockNumbers);
      setLoading(false);
    })
  }

  return (
    <Container>
      <Box py={4}>
        <Paper>
          <Box
            p={2}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Link href="/blocks" passHref>
              <Button
                componet="a"
                variant="contained"
              >
                Check Blocks
              </Button>
            </Link>
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}
