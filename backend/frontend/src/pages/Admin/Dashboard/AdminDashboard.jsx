import Main from "./Main/Main";
import Sidebar from "./Sidebar/Sidebar";
import { Box } from '@mui/material';

const AdminDashboard = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <Main />
    </Box>
  );
};

export default AdminDashboard;
