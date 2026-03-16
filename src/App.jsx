import { TonConnectButton, useTonConnectUI } from '@tonconnect/ui-react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { beginCell, toNano } from '@ton/ton';

// Это адрес твоего контракта, который мы получим после деплоя
const CONTRACT_ADDRESS = "EQCxPXaqZAgiZIlWMDhds0LIDA1aHKAsiouihK4SDXXFw0_j";

function BetApp() {
  const [tonConnectUI] = useTonConnectUI();

  const sendBet = async (isYes) => {
    // 0x19934661 — это стандартный ID (opcode) сообщения Bet в твоем контракте
    const body = beginCell()
      .storeUint(0x19934661, 32) // ID сообщения Bet
      .storeBit(isYes)           // Значение true (Да) или false (Нет)
      .endCell();

    const transaction = {
      validUntil: Math.floor(Date.now() / 1000) + 60,
      messages: [
        {
          address: CONTRACT_ADDRESS,
          amount: toNano("0.5").toString(), // Ставка 0.5 TON (можешь изменить)
          payload: body.toBoc().toString("base64")
        }
      ]
    };

    await tonConnectUI.sendTransaction(transaction);
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>Сделай свою ставку!</h1>
      <TonConnectButton style={{ margin: '0 auto' }} />
      
      <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button onClick={() => sendBet(true)} style={{ padding: '10px 20px', background: 'green', color: 'white' }}>
          СТАВЛЮ НА ДА
        </button>
        <button onClick={() => sendBet(false)} style={{ padding: '10px 20px', background: 'red', color: 'white' }}>
          СТАВЛЮ НА НЕТ
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <TonConnectUIProvider manifestUrl="https://your-app.vercel.app/tonconnect-manifest.json">
      <BetApp />
    </TonConnectUIProvider>
  );
}

export default App;