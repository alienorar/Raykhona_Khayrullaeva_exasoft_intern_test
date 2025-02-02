import React from 'react';
import { Popover, Button } from 'antd';
import { DeleteOutlined, LogoutOutlined } from '@ant-design/icons';

interface PopoverActionProps {
    title: string;
    description: string;
    onConfirm: () => void;
    icon: React.ReactNode;
}

const PopoverAction: React.FC<PopoverActionProps> = ({ title, description, onConfirm, icon }) => {
    return (
        <Popover
            content={
                <div>
                    <p>{description}</p>
                    <Button type="danger" onClick={onConfirm}>
                        Confirm
                    </Button>
                </div>
            }
            title={title}
            trigger="click"
        >
            <Button type="text" icon={icon} />
        </Popover>
    );
};

export default PopoverAction;
