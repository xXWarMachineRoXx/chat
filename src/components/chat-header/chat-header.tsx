import classNames from 'classnames';
import styles from './chat-header.module.scss';
import { PersonCircle,ThreeDotsVertical,PlusSquare,ChevronCompactDown } from 'react-bootstrap-icons'

export interface ChatHeaderProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/configuration-for-chat-headers-and-templates
 */
export const ChatHeader = ({ className }: ChatHeaderProps) => {
    return (
        <div className={classNames(styles.root, className, styles['chat-header'])} >
            <button>
                <h6><PersonCircle></PersonCircle> Agent Name</h6>
                <h6>Application Team</h6>
              
            </button>
            <ThreeDotsVertical></ThreeDotsVertical>
            <PlusSquare></PlusSquare>
            <ChevronCompactDown></ChevronCompactDown>


        </div>
    );
};
