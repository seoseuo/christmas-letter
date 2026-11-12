import ChristmasApp from '../../components/ChristmasApp';
import Screen from '../../components/screens/LettersScreen';

export default function Page() {
  return <ChristmasApp initialPage="letters" Screen={Screen} />;
}
