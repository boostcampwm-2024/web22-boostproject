import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { MainPage, ClientPage, HostPage } from './pages';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@apis/index';
import withUserId from '@hocs/withUserId';
import ReplayPage from '@pages/ReplayPage';

function AppComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Router
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true
          }}
        >
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/live" element={<ClientPage />} />
            <Route path="/live/:id" element={<ClientPage />} />
            <Route path="/replay" element={<ReplayPage />} />
            <Route path="/replay/:id" element={<ReplayPage />} />
            <Route path="/host" element={<HostPage />} />
            <Route path="/host/:id" element={<HostPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

const App = withUserId(AppComponent);

export default App;
