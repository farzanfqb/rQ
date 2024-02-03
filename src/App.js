import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { HomePage } from './components/Home.page';
import { SuperHeroesPage } from './components/SuperHeroes.page';
import { RQSuperHeroesPage } from './components/RQSuperHeroes.page';
import './App.css';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RQSuperHeroPage } from './components/RQSuperHero.page';
import { ParallelQueriesPage } from './components/ParallelQueries.page';
import { DynamicParallelPage } from './components/DynamicParallel.page';
import { DependentQueriesPage } from './components/DependentQueries.page';
import { PaginatedQueriesPage } from './components/PaginatedQueries.page';
import { InfiniteQueriesPage } from './components/InfiniteQueries.page';
const queryClient = new QueryClient;

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div>
          <nav>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/super-heroes'>Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to='/rq-super-heroes'>RQ Super Heroes</Link>
              </li>
              <li>
                <Link to='/rq-parallel'>RQ ParallelQueries</Link>
              </li>
              <li>
                <Link to='/rq-dynamic-parallel'>RQ Dynamic ParallelQueries</Link></li>
              <li> <Link to='/rq-dependent'>RQ Dependent Queries</Link></li>
              <li> <Link to='/rq-paginated'>RQ Pagination</Link></li>
              <li> <Link to='/rq-infinite'>RQ Infinite</Link></li>
            </ul>
          </nav>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/super-heroes' element={<SuperHeroesPage />} />
            <Route path='/rq-super-heroes' element={<RQSuperHeroesPage />} />
            <Route path='/rq-super-heroes/:heroId' element={<RQSuperHeroPage />} />
            <Route path='/rq-parallel' element={<ParallelQueriesPage />} />
            <Route path='/rq-dynamic-parallel' element={<DynamicParallelPage heroIds={[1, 3]} />} />
            <Route path='/rq-dependent' element={<DependentQueriesPage email='vishwas@example.com' />} />
            <Route path='/rq-paginated' element={<PaginatedQueriesPage />} />
            <Route path='/rq-infinite' element={<InfiniteQueriesPage />} />

          </Routes>
        </div>
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;