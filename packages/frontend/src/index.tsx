import { Box } from './components/box';
import { BaseLayout } from './components/layout';
import { IDLogo } from './components/logo';
import Mint from './components/mint';
import QuestSection from './components/quest';
import Wallet from './components/wallet';

export default function Index() {
  return (
    <BaseLayout>
      <div className="min-h-screen flex flex-col justify-safe-center py-4">
        <div className="grid grid-cols-3 gap-3">
          <Box className="col-span-3 sm:col-span-1 p-0.5">
            <div className="bg-primary w-full h-full flex justify-center items-center py-1">
              <IDLogo />
            </div>
          </Box>
          <Box label="Wallet" className="col-span-3 sm:col-span-2">
            <Wallet />
          </Box>

          <Box label="Mint Fission ID" className="col-span-3 sm:col-span-1">
            <Mint />
          </Box>

          <Box label="Quests" className="col-span-3 sm:col-span-2">
            <QuestSection />
          </Box>

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
  );
}
