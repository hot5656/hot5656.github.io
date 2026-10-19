import { useSearchParams } from 'react-router-dom';

// 從網址 ?page= 讀取目前頁碼，換頁時同步寫回網址並捲回頂端
export function usePageParam() {
  const [searchParams, setSearchParams] = useSearchParams();

  const parsedPage = parseInt(searchParams.get('page') || '1', 10);
  const currentPage = Number.isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;

  function goToPage(page: number) {
    const next = new URLSearchParams(searchParams);
    if (page <= 1) {
      next.delete('page');
    } else {
      next.set('page', String(page));
    }
    setSearchParams(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return { currentPage, goToPage };
}
