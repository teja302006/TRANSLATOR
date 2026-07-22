import { motion } from 'framer-motion';
import Home from './pages/Home';

function App() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen text-white">
      <Home />
    </motion.div>
  );
}

export default App;
