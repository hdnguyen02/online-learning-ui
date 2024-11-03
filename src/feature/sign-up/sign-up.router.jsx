
import { Routes, Route } from 'react-router-dom'; // Import Routes as well
import SignUpComponent from './sign-up.component';

const SignUpRouter = () => {
  return (
    <Routes>
      <Route path="/sign-up" element={<SignUpComponent />} />
    </Routes>
  );
};

export default SignUpRouter;
