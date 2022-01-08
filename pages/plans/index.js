import Layout from "../../components/layout"
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function plans(){

    const data=[
        
          {
            "id": 1,
            "name": "Back SQUAT",
            "warm_up_sets": 4,
            "working_sets": 1,
            "reps": 2
          },
          {
            "id": 2,
            "name": "SQUAT WALK-OUT",
            "warm_up_sets": 0,
            "working_sets": 1,
            "reps": 10
          },
          {
            "id": 3,
            "name": "GLUTE HAM RAISE",
            "warm_up_sets": 1,
            "working_sets": 2,
            "reps": 8
          },
          {
            "id": 4,
            "name": "HELMS ROW",
            "warm_up_sets": 1,
            "working_sets": 2,
            "reps": 12
          },
    
          {
            "id": 5,
            "name": "HAMMER CURL",
            "warm_up_sets": 0,
            "working_sets": 3,
            "reps": 20
          },
    
          {
            "id": 6,
            "name": "OVERHEAD PRESS",
            "warm_up_sets": 2,
            "working_sets": 3,
            "reps": 6
          }
    
    
        ]
      

function createData(day) {
  return {
    day,
    // reps,
    tasks: data
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow align="left" sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          {row.day}
        </TableCell>
        {/* <TableCell component="th" scope="row">
          {row.day}
        </TableCell> */}
        {/* <TableCell align="right">{row.day}</TableCell> */}
        {/* <TableCell align="right">{row.fat}</TableCell> */}
        {/* <TableCell align="right">{row.carbs}</TableCell> */}
        {/* <TableCell align="right">{row.reps}</TableCell> */}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Tasks
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Exercise Name</TableCell>
                    <TableCell>WARM-UP SETS</TableCell>
                    <TableCell>WORKING SETS</TableCell>
                    <TableCell >REPS</TableCell>
                    {/* <TableCell >Total price ($)</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.tasks.map((taskRow) => (
                    <TableRow key={taskRow.id}>
                      <TableCell component="th" scope="row">
                        {taskRow.name}
                      </TableCell>
                      <TableCell>{taskRow.working_sets}</TableCell>
                      <TableCell>{taskRow.warm_up_sets}</TableCell>
                      <TableCell >
                      {taskRow.reps}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     // calories: PropTypes.number.isRequired,
//     // carbs: PropTypes.number.isRequired,
//     day: PropTypes.string.isRequired,
//     tasks: PropTypes.arrayOf(
//       PropTypes.shape({
//         name: PropTypes.string.isRequired,
//         warm_up_sets: PropTypes.number.isRequired,
//         working_sets: PropTypes.number.isRequired,
//         reps: PropTypes.number.isRequired,
//         }),
//     ).isRequired,
//     //doubt
//     // name: PropTypes.string.isRequired,
//     // price: PropTypes.number.isRequired,
//     // protein: PropTypes.number.isRequired,
//   }).isRequired,
// };

const rows = [
  createData('Monday'),
  createData('Tuesday'),
  createData('Wednesday'),
  createData('Thursday'),
  createData('Friday'),
  createData('Saturday'),
  createData('Sunday')
];


return (
    <>
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead > 
          <TableRow >
            <TableCell>Day</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row  key={row.id} row={row} />
          ))}
          
        </TableBody>
        <style jsx global>{`
        .MuiTableBody-root {
          margin: 0;
          padding: 0;
          font-size: 18px;
          font-weight: 400;
          line-height: 1.8;
          color: black;
          font-family: sans-serif;
        }
        
      `}</style>
      </Table>
    </TableContainer>
  );
 
  );
  </>
  )


}

export default plans;