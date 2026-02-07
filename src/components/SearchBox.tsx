import { useState, useEffect } from 'react';
import { Search, Loader2, ChevronRight } from 'lucide-react';
import { t, type Language } from '../lib/translations';
import categories from '../data/categories.json';
import decisions from '../data/decisions.json';
import biases from '../data/biases.json';

interface SearchBoxProps {
  lang: Language;
}

interface SearchResults {
  decisions: typeof decisions;
  biases: typeof biases;
}

export default function SearchBox({ lang }: SearchBoxProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults(null);
      return;
    }

    const timer = setTimeout(async () => {
      setSearching(true);
      
      const query = searchQuery.toLowerCase();
      
      // Search decisions
      const matchingDecisions = decisions.filter(decision => {
        const title = lang === 'fr' ? decision.titleFr : decision.title;
        const description = lang === 'fr' ? decision.descriptionFr : decision.description;
        return title.toLowerCase().includes(query) || 
               description?.toLowerCase().includes(query);
      });

      // Search biases
      const matchingBiases = biases.filter(bias => {
        const name = lang === 'fr' ? bias.nameFr : bias.name;
        const summary = lang === 'fr' ? bias.summaryFr : bias.summary;
        return name.toLowerCase().includes(query) || 
               summary.toLowerCase().includes(query);
      });

      setSearchResults({
        decisions: matchingDecisions,
        biases: matchingBiases
      });
      
      setSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, lang]);

  return (
    <>
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder={t('home.placeholder', lang)}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border-2 border-primary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 bg-white text-gray-900 placeholder-gray-500"
        />
        {searching && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 animate-spin" />
        )}
      </div>

      {searchResults && (
        <div className="space-y-6 mb-6">
          {searchResults.decisions.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                {t('results.decisions', lang)}
              </h2>
              <div className="space-y-2">
                {searchResults.decisions.map((decision) => (
                  <a
                    key={decision.id}
                    href={`${lang === 'fr' ? '/fr' : ''}/decision/${decision.slug}`}
                    className="block bg-white rounded-xl p-4 border-2 border-primary-100 hover:border-primary-400 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {lang === 'fr' ? decision.titleFr : decision.title}
                        </h3>
                        {decision.description && (
                          <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                            {lang === 'fr' ? decision.descriptionFr : decision.description}
                          </p>
                        )}
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {searchResults.biases.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                {t('results.biases', lang)}
              </h2>
              <div className="space-y-2">
                {searchResults.biases.map((bias) => (
                  <a
                    key={bias.id}
                    href={`${lang === 'fr' ? '/fr' : ''}/bias/${bias.slug}`}
                    className="block bg-white rounded-xl p-4 border-2 border-primary-100 hover:border-primary-400 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {lang === 'fr' ? bias.nameFr : bias.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                          {lang === 'fr' ? bias.summaryFr : bias.summary}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {searchResults.decisions.length === 0 && searchResults.biases.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">
                {t('home.no_results', lang)} "{searchQuery}"
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
}