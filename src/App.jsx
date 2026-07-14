import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Instructions from './pages/Instructions';
import Exam from './pages/Exam';
import Result from './pages/Result';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/exam" element={<Exam />} />
        <Route
          path="*"
          element={
            <MainLayout>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/instructions" element={<Instructions />} />
                <Route path="/result" element={<Result />} />
              </Routes>
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
