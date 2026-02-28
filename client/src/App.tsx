import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './Layout';
import MainPage from './routes/Main';
import CreatePage from './routes/store/Create';
import ShowPage from './routes/store/Show';
import ErrorPage from './routes/Error';
import ContactPage from './routes/Contact';
import TermsAndConditionsPage from './routes/TermsAndConditions';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route errorElement={<ErrorPage />} path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path='/contact' element={<ContactPage />} />
            <Route path='/terms-and-conditions' element={<TermsAndConditionsPage />} />
            <Route path='/404' element={<ErrorPage />} />
            <Route path="/:slug" element={<ShowPage />} />
            <Route path='*' element={<ErrorPage />} />
          </Route>
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
