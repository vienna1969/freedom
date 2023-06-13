import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import type { NextPageWithLayout } from '@/types';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { NextSeo } from 'next-seo';
import cn from 'classnames';
import routes from '@/config/routes';
import Button from '@/components/ui/button';
import Image from '@/components/ui/image';
import ParamTab, { TabPanel } from '@/components/ui/param-tab';
import VoteList from '@/components/vote/vote-list';
import { ExportIcon } from '@/components/icons/export-icon';
// static data
import { getVotesByStatus } from '@/data/static/vote-data';
import votePool from '@/assets/images/vote-pool.svg';
import RootLayout from '@/layouts/_root-layout';
import { useLayout } from '@/lib/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/lib/constants';

//import movIntro from '@/assets-landing/mov/intro.mp4';

import LogoMomocon from '@/assets-landing/images/logo-momocon.svg';
import IcoApple from '@/assets-landing/images/ico-apple.svg';
import IcoAndroid from '@/assets-landing/images/ico-android.svg';
import IcoScrolldown from '@/assets-landing/images/ico-scrolldown.svg';

import phonePC from '@/assets-landing/images/img-app.png';
import phoneMobile from '@/assets-landing/images/0_asset.png';

import {
  nftDropContractAddressHorse,
  stakingContractAddressHorseAAA,
  tokenContractAddressGRD,
} from '../../config/contractAddresses';

import {
  ConnectWallet,
  useDisconnect,
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useContractRead,
  useOwnedNFTs,
  useTokenBalance,
  Web3Button,
} from '@thirdweb-dev/react';

import Head from 'next/head';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      title: 'Granderby - Home',
      description: 'powered by MOMOCON',
      image: '/intro-bg.png',
    },
  };
};

const ProposalsPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = (props) => {
  const { title, image, description } = props;

  const router = useRouter();
  const { layout } = useLayout();
  const { totalVote: totalActiveVote } = getVotesByStatus('active');
  const { totalVote: totalOffChainVote } = getVotesByStatus('off-chain');
  const { totalVote: totalExecutableVote } = getVotesByStatus('executable');
  const { totalVote: totalPastVote } = getVotesByStatus('past');

  const address = useAddress();

  const { contract: tokenContract } = useContract(
    tokenContractAddressGRD,
    'token'
  );
  const { data: tokenBalance } = useTokenBalance(tokenContract, address);

  {
    /*
  useEffect(() => {
    Array.from(document.getElementsByTagName("iframe")).forEach((iframe) => {
      iframe?.contentWindow?.addEventListener(
        "load",
        () => {
          const doc = iframe.contentWindow?.document;
          iframe.height = doc?.body.scrollHeight;
        },
        true
      );
      iframe.contentWindow.addEventListener(
        "resize",
        () => {
          iframe.height = iframe?.contentWindow?.document?.body?.scrollHeight + 40;
        },
        true
      );
    });
  }, []);
*/
  }

  return (
    <>
      <NextSeo
        title="Landing"
        description="Granderby - NFT Horse Racing Game"
      />

      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1 maximum-scale=1"
        />
        <meta property="og:type" content="website"></meta>

        <meta property="og:site_name" content="GRANDERBY"></meta>
        <meta name="twitter:card" content="summary_large_image"></meta>

        <meta property="og:image:width" content="1400"></meta>
        <meta property="og:image:height" content="1400"></meta>

        <meta property="og:title" content={title}></meta>
        <meta property="og:description" content={description}></meta>
        <meta property="og:image" content={image}></meta>

        <meta name="twitter:image" content={image}></meta>

        <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        ></meta>

        <title>{title}</title>
      </Head>

      <div className=" w-full">
        {!address ? (
          <ConnectWallet theme="light" />
        ) : (
          <div className="mt-3 text-sm font-medium tracking-tighter text-gray-600 dark:text-gray-400 xl:mt-3">
            <span>Current Balance</span>
            <h3>
              <b>{tokenBalance?.displayValue}</b> {tokenBalance?.symbol}
            </h3>
          </div>
        )}

        {/*
        <iframe
          //className='w-full h-[600px]'

          ///src="http://live.granderby.io"

          src="https://granderby.io/redirect.html"
          ///src="http://localhost:3000/redirect.html"

          //src="https://www.google.com/search?q=%http://live.granderby.io"

          //width="600px"

          //style={{ with: '100%' }}
          //frameborder="0"
          //sandbox='allow-modal'
          width={1100}
          height={670}
        ></iframe>
        */}
      </div>

      {/*
<iframe src="http://live.granderby.io" width={1000} height={500} sandbox='allow-scripts allow-modal'></iframe>
  */}

      <footer>
        <div className="footer-wrap">
          <Image src={LogoMomocon} alt="MOMOCON" width={48} height={48} />
          <p>
            MOMOCON SG CO.,LTD.
            <br />
            Copyrights GRANDERBY since 2023
          </p>
        </div>
      </footer>
    </>
  );
};

ProposalsPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default ProposalsPage;
