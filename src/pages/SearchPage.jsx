import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MdSearch } from 'react-icons/md';
import MainLayout from '../layouts/MainLayout';
import EventCard from '../components/cards/EventCard';
import { SkeletonCard } from '../components/common/Skeleton';
import EmptyState from '../components/common/EmptyState';
import SearchBar from '../components/common/SearchBar';
import { eventService } from '../services/eventService';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    eventService.getAll({ search: query, limit: 24 })
      .then(res => setResults(res.events))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <MainLayout>
      <div className="content-max px-4 sm:px-6 lg:px-8 mx-auto py-8">
        <div className="max-w-2xl mx-auto mb-10">
          <h1 className="text-3xl font-display font-bold text-white mb-6 text-center">
            {query ? `Results for "${query}"` : 'Search Events'}
          </h1>
          <SearchBar className="w-full" placeholder="Search events, artists, venues, cities..." />
        </div>

        {!query ? (
          <div className="text-center py-16">
            <MdSearch size={64} className="text-[#B6BDC9] mx-auto mb-4 opacity-50" />
            <p className="text-[#B6BDC9]">Start typing to search for events across South Africa</p>
          </div>
        ) : loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : results.length === 0 ? (
          <EmptyState type="search" title={`No results for "${query}"`} message="Try different keywords or browse all events." />
        ) : (
          <>
            <p className="text-[#B6BDC9] mb-6">{results.length} results found</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {results.map((event, i) => <EventCard key={event.id} event={event} index={i} />)}
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default SearchPage;
