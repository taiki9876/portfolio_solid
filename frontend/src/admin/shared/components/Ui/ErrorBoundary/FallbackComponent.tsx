import { Colors } from '@admin/assets/styles/colors';

type Props = {
    error: Error;
    resetErrorBoundary: () => void;
};
export const FallbackComponent = ({ resetErrorBoundary }: Props) => {
    return (
        <div
            style={{
                padding: '2rem',
                color: Colors.black,
                textAlign: 'center',
            }}
        >
            <h2>予期しないエラーが発生しました</h2>
            <p>しばらく時間をおいてもう一度お試しください。</p>
            <p>それでも解決しない場合はサポートまでお問い合わせください。</p>
            <button
                onClick={resetErrorBoundary}
                style={{
                    display: 'inline-block',
                    marginTop: '20px',
                    padding: '10px 20px',
                    fontSize: '16px',
                    color: Colors.white,
                    backgroundColor: Colors.primary,
                    textDecoration: 'none',
                    borderRadius: '5px',
                    border: 'none',
                }}
            >
                ホームに戻る
            </button>
        </div>
    );
};
