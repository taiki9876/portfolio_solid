import styles from './ErrorBox.module.css';

type Props = {
    messages: string[];
};
export const ErrorBox = ({ messages }: Props) => {
    return (
        <div className={styles.container}>
            {messages.map((message, index) => (
                <p key={`error-${index}`} className={styles.message}>
                    {message}
                </p>
            ))}
        </div>
    );
};
