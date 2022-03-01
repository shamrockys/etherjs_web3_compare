## Requirement

Create react/next.js app to fetch the latest 10 blocks real time from BSC
If user click on table, shows all transactions included in that block order by transferred amount.

## Challenges

Number can only safely store up to 53 bits

Above error only appears on fetching "deposit" type transactions

## Solution

Replaced web3 with etherjs