import { Fragment } from 'react';
import styles from './UrlMessage.module.css';

const urlRegex = /(https?:\/\/[^\s]+)/g;
type Props = {
    contentKey: string;
    content: string;
};
export const UrlMessage = ({ contentKey, content }: Props) => {
    if (!urlRegex.test(content)) {
        return <span>{content}</span>;
    }
    return (
        <>
            {content.split('\n').map((line, index) => (
                <Fragment key={`${contentKey}-${index}`}>
                    {line.split(urlRegex).map((part, idx) =>
                        urlRegex.test(part) ? (
                            <a
                                key={idx}
                                href={part}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.link}
                            >
                                {part}
                            </a>
                        ) : (
                            part
                        )
                    )}
                    <br />
                </Fragment>
            ))}
        </>
    );
};
