import { Box } from './components/box';
import { Button } from './components/button';
import DataLabeling from './components/data-labeling';
import FAQ from './components/faq';

import { BaseLayout } from './components/layout';
import { IDLogo } from './components/logo';
import Mint from './components/mint';
import QuestSection from './components/quest';
import Wallet from './components/wallet';
import { useLabeling } from './lib/use-labeling';

export default function Index() {
  const labelingMode = useLabeling((state) => state.labelingMode);

  console.log('----', import.meta.env.ANTHROPIC_API_KEY);

  return (
    <>
      <BaseLayout>
        <div className="min-h-screen flex flex-col justify-safe-center">
          <div className="grid grid-cols-3 gap-3">
            <Box className="col-span-3 sm:col-span-1 p-0.5">
              <div className="bg-primary w-full h-full flex justify-center items-center py-1">
                <IDLogo />
              </div>
            </Box>
            <Box label="Wallet" className="col-span-3 sm:col-span-2">
              <Wallet />
            </Box>

            <div className="col-span-3 sm:col-span-1 space-y-2">
              <Box label="Mint Fission ID">
                <Mint />
              </Box>
              <Button
                className="w-full"
                size="lg"
                onClick={() => {
                  const faq = document.getElementById('faq');

                  if (faq) {
                    faq.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    });
                  }
                }}
              >
                QnA
              </Button>
            </div>

            {labelingMode && (
              <div className="col-span-3 sm:col-span-2">
                <DataLabeling />
              </div>
            )}
            {!labelingMode && (
              <Box label="Quests" className="col-span-3 sm:col-span-2">
                <QuestSection />
              </Box>
            )}

            <footer className="col-span-3">
              <p className="flex justify-center gap-2">
                ©{' '}
                <a
                  href="https://www.fission.lol"
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Fission
                </a>
              </p>
            </footer>
          </div>
        </div>
      </BaseLayout>
      <BaseLayout>
        <FAQ />
      </BaseLayout>
    </>
  );
}
