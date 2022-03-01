import React from 'react';
import Link from 'next/link';
import { Container, Box, Paper, Divider, List, ListItem, CircularProgress, Button } from '@mui/material';
import { getBlockLatest, getBlocks } from 'utils/web3';
import { MdKeyboardArrowRight } from 'react-icons/md';
import differenceInSeconds from 'date-fns/differenceInSeconds';

const BlockList = () => {

  const initialized = React.useRef(false);
  const isFetching = React.useRef(false);
  const blockMap = React.useRef({});
  const [numbers, setNumbers] = React.useState([]);

  React.useEffect(() => {
    const timer = setInterval(() => {
      handleFetch();
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleFetch = async () => {
    if (isFetching.current === false) {
      isFetching.current = true;

      const lastBlockNumber = await getBlockLatest();
      let blockNumbers = [];
      let blockNumbersNew = [];
      let blockMapNew = {};

      // get block numbers
      for (let i = 0; i < 10; i++) {
        blockNumbers.push(lastBlockNumber - i);
        if (blockMap.current[lastBlockNumber - i]) {
          blockMapNew[lastBlockNumber - i] = blockMap.current[lastBlockNumber - i];
        } else {
          blockNumbersNew.push(lastBlockNumber - i);
        }
      }

      // get blocks
      let newBlocks = await getBlocks(blockNumbersNew);

      for (const block of newBlocks) {
        blockMapNew[block.number] = block;
      }

      initialized.current = true;
      isFetching.current = false;
      blockMap.current = blockMapNew;
      setNumbers(blockNumbers);

    }
  };

  const handleRetry = () => {
    initialized.current = false;
    setBlocks([]);
    handleFetch();
  }

  return (
    <Container>
      <Box py={4}>
        <Paper>
          <Box
            px={2}
            sx={{
              color: '#888',
              height: 60,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            Latest 10 blocks from BSC
          </Box>
          <Divider />
          {numbers.length === 0 && initialized.current === false &&
            <Box
              sx={{
                minHeight: 400,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <CircularProgress size={20} />
            </Box>
          }
          {numbers.length === 0 && initialized.current === true &&
            <Box
              sx={{
                minHeight: 400,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Button
                variant="contained"
                onClick={handleRetry}
              >
                Retry
              </Button>
            </Box>
          }
          <List disablePadding>
            {numbers.map(number =>
              <Link
                key={number}
                href={`/blocks/${number}`}
                passHref
              >
                <ListItem
                  component="a"
                  button
                >
                  <Box
                    sx={{
                      width: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Box>
                      <Box>
                        {number}
                      </Box>
                      {blockMap.current[number] &&
                        <>
                          <Box sx={{ fontSize: 12, color: '#888' }}>
                            {differenceInSeconds(Date.now(), new Date(blockMap.current[number].timestamp * 1000))} secs ago
                          </Box>
                          <Box sx={{ fontSize: 12, color: 'primary.main' }}>
                            {blockMap.current[number].transactions.length} transactions
                          </Box>
                        </>
                      }
                    </Box>
                    <MdKeyboardArrowRight />
                  </Box>
                </ListItem>
              </Link>
            )}
          </List>
        </Paper>
      </Box>
    </Container>
  )
};

export default BlockList