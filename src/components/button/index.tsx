import { NextPage } from 'next';
import './index.mudule.css';

type Props = {
    text: string;
    click: () => void;
};

export default ((props: Props) => {
    const { text, click } = props;
    return (
        <button className="btn_donate" onClick={click}>
            {text}
        </button>
    );
}) as NextPage<Props>;
