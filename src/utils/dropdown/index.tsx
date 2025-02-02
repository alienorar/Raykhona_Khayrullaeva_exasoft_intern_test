import React, { useState } from 'react';
import { EditOutlined, DashOutlined, DeleteOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space, Tooltip, Popover } from 'antd';

interface CustomDropdownProps {
    onEdit: () => void;
    onDelete: () => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ onEdit, onDelete }) => {
    const [visible, setVisible] = useState(false);

    const handleDelete = () => {
        onDelete(); 
        setVisible(false);  
    };

    const content = (
        <div>
            <p>Вы хотите удалить?</p>
            <Button type="primary" onClick={handleDelete}>
                Yes
            </Button>
            <Button onClick={() => setVisible(false)} style={{ marginLeft: '8px' }}>
                No
            </Button>
        </div>
    );

    const handleMenuClick: MenuProps['onClick'] = (e) => {
        if (e.key === '1') {
            onEdit();
        }
    };

    const items: MenuProps['items'] = [
        {
            label: 'Изменить',
            key: '1',
            icon: <EditOutlined />,
        },
        {
            label: 'Удалить',
            key: '2',
            icon: <DeleteOutlined />,
            danger: true,
            onClick: () => setVisible(true),  
        },
    ];

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    return (
        <Space>
            <Tooltip title="Меню">
                <Dropdown menu={menuProps} trigger={['click']}>
                    <Button
                        style={{ background: 'transparent', border: 'none', boxShadow: 'none', fontSize: '22px', fontWeight: 'bold' }}
                        icon={<DashOutlined style={{ transform: 'rotate(90deg)' }} />}
                    />
                </Dropdown>
            </Tooltip>

            {/* Popover for delete confirmation */}
            <Popover
                content={content}
                title="Confirm Delete"
                visible={visible}
                onVisibleChange={setVisible}
                trigger="click"
            />
        </Space>
    );
};

export default CustomDropdown;
