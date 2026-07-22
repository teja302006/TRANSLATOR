import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TranslatorCard from '../components/TranslatorCard';
import History from '../components/History';
import Footer from '../components/Footer';
import { useTranslator } from '../hooks/useTranslator';

function Home() {
  const {
    source,
    target,
    input,
    output,
    loading,
    error,
    history,
    languages,
    isListening,
    isFavorite,
    setSource,
    setTarget,
    setInput,
    swapLanguages,
    clearAll,
    handleTranslate,
    copyOutput,
    speak,
    toggleFavorite,
    startListening,
    stopListening,
    deleteHistoryItem,
    clearHistory,
  } = useTranslator();

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">
        <Hero />
        <TranslatorCard
          source={source}
          target={target}
          input={input}
          output={output}
          loading={loading}
          error={error}
          languages={languages}
          isListening={isListening}
          isFavorite={isFavorite}
          setSource={setSource}
          setTarget={setTarget}
          setInput={setInput}
          swapLanguages={swapLanguages}
          clearAll={clearAll}
          handleTranslate={handleTranslate}
          copyOutput={copyOutput}
          speak={speak}
          toggleFavorite={toggleFavorite}
          startListening={startListening}
          stopListening={stopListening}
          history={history}
        />
        <History items={history} onDelete={deleteHistoryItem} onClear={clearHistory} />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
