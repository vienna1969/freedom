import { NextSeo } from 'next-seo';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import type { NextPageWithLayout } from '@/types';
import Search from '@/components/search/search-reddit';
import { useLayout } from '@/lib/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/lib/constants';
import RetroSearch from '@/components/search/retro-search';
import RootLayout from '@/layouts/_root-layout';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

const SearchPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = () => {
  const { layout } = useLayout();

  // render retro layout
  if (layout === LAYOUT_OPTIONS.RETRO) {
    return (
      <>
        <NextSeo title="Explore NTF" description="Freedom - Web3 NFT Game" />
        <RetroSearch />
      </>
    );
  }

  // render default create NFT component
  return (
    <>
      <NextSeo title="Explore NTF" description="Freedom - Web3 NFT Game" />

      <Search />
    </>
  );
};

SearchPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default SearchPage;
