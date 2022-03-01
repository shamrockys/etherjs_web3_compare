import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Container, Box, Paper, Divider, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress } from '@mui/material';
import { getBlocks, getTransactions } from 'utils/ether';
import { MdKeyboardArrowLeft } from 'react-icons/md';

const Block = () => {
  const router = useRouter();
  const { number } = router.query;

  const initialized = React.useRef(false);
  const mounted = React.useRef(true);
  const [transactions, setTransactions] = React.useState([]);

  React.useEffect(() => {
    if (number) {
      handleFetch();
    }

    return () => {
      mounted.current = false;
    }
  }, [number]);

  const handleFetch = async () => {
    let blocks = [];
    let transactions = [];

    try {
      blocks = await getBlocks([parseInt(number)]);
    } catch (e) {
      console.log('getBlock', number);
      console.log(e);
    }

    if (blocks[0]) {
      try {
        transactions = await getTransactions(blocks[0].transactions);
      } catch (e) {
        console.log('getTransactions', blocks[0].transactions);
        console.log(e);
      }
    }

    initialized.current = true;

    if (mounted) {
      setTransactions(transactions);
    }
  };

  return (
    <Container>
      <Box py={4}>
        <Paper>
          <Box
            px={2}
            sx={{
              height: 60,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: '#888',
            }}
          >
            <Link href="/blocks" passHref>
              <IconButton>
                <MdKeyboardArrowLeft />
              </IconButton>
            </Link>
            <Box>
              {number}
            </Box>
          </Box>
          <Divider />
          {initialized.current === false &&
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
          {initialized.current === true && transactions.length > 0 &&
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Tnx</TableCell>
                    <TableCell>Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.sort((a, b) => b.value - a.value).map(tnx => (
                    <TableRow
                      key={tnx.hash}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell>
                        {tnx.hash}
                      </TableCell>
                      <TableCell>
                        {tnx.value / 1000000000000000000} BNB
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          }
        </Paper>
      </Box>
    </Container>
  );
}

export default Block