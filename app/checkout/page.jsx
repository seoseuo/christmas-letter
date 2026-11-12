import ChristmasApp from '../../components/ChristmasApp';
import Screen from '../../components/screens/CheckoutScreen';

export default function Page() {
  return <ChristmasApp initialPage="checkout" Screen={Screen} />;
}
