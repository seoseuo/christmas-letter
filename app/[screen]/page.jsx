import { notFound } from 'next/navigation';
import ChristmasApp from '../../components/ChristmasApp';
import { routableScreens } from '../../lib/routes';

export default async function ScreenPage({ params }) {
  const { screen } = await params;
  if (!routableScreens.includes(screen)) notFound();
  return <ChristmasApp initialPage={screen} />;
}
