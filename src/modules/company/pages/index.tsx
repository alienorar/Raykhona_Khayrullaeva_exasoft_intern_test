import React, { useEffect, useState } from 'react';
import { Button, Table, Switch, message, Modal } from 'antd';
import { createStyles } from 'antd-style';
import { LoginOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons';
import CategoriesModal from "./modal";
import { useGetCategory } from '../hooks/queries';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDeleteCategory } from '../hooks/mutations';
import CustomDropdown from '../../../utils/dropdown';
import { CategoryType } from '../types';
import { removeAccesToken } from '../../../utils/token-service';

const useStyle = createStyles(({ css }) => ({
  customTable: css`
    .ant-table {
      background-color: var(--bg-color);
      color: var(--text-color);

      .ant-table-container {
        .ant-table-body,
        .ant-table-content {
          scrollbar-width: thin;
          scrollbar-color: #eaeaea transparent;
          scrollbar-gutter: stable;
        }
      }

      th {
        background-color: var(--table-header-bg);
        color: var(--text-color);
      }

      td {
        background-color: var(--table-row-bg);
        color: var(--text-color);
      }

      tr:hover td {
        background-color: var(--table-hover-bg);
      }
    }
  `,

  topDiv: css`
    background-color: var(--header-bg); 
    padding: 16px 50px;
    margin-bottom: 16px;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: var(--text-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  container: css`
    max-width: 1200px;
    margin: 0 auto;
    background-color: var(--bg-color);
    border-radius: 4px;
    padding: 20px;
  `,
}));

const App: React.FC = () => {
  const { styles } = useStyle();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(localStorage.getItem('theme') as 'light' | 'dark' || 'light');
  const [update, setUpdate] = useState({});
  const [tableData, setTableData] = useState([]);
  const [total, setTotal] = useState();
  const navigate = useNavigate();
  const { search } = useLocation();
  const { mutate } = useDeleteCategory();

  const [params, setParams] = useState({
    search: "",
    limit: 2,
    page: 1
  });

  const { data } = useGetCategory(params);

  useEffect(() => {
    const params = new URLSearchParams(search);
    let page = Number(params.get("page")) || 1;
    let limit = Number(params.get("limit")) || 2;
    let search_value = params.get("search") || "";
    setParams(prev => ({
      ...prev,
      limit: limit,
      page: page,
      search: search_value,
    }));
  }, [search]);

  const handleLogout = () => {
    navigate('/');
    removeAccesToken()
  };

  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

  // ================= Light / Dark Mode =================
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleTableChange = (pagination: any) => {
    const { current, pageSize } = pagination;
    setParams(prev => ({
      ...prev,
      limit: pageSize,
      page: current,
    }));

    const searchParams = new URLSearchParams(search);
    searchParams.set("page", `${current}`);
    searchParams.set('limit', `${pageSize}`);
    navigate(`?${searchParams}`);
  };

  const getData = () => {
    if (data?.data) {
      setTableData(data.data);
      setTotal(data.data.count);
    }
  };

  useEffect(() => {
    getData();
  }, [data]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  // =========== EDIT DATA ===========
  const editData = (item: CategoryType) => {
    setUpdate(item);
    showModal();
  };

  // =========== DELETE DATA ===========
  const deleteData = (id: number | string) => {
    mutate(id);
  };

  const showLogoutModal = () => {
    setIsLogoutModalVisible(true);
  };

  const handleLogoutOk = () => {
    setIsLogoutModalVisible(false);
    handleLogout();
  };

  const handleLogoutCancel = () => {
    setIsLogoutModalVisible(false);
  };

  return (
    <div>
      <div className={styles.topDiv}>
        <h3 className='text-[28px]'>Компании</h3>
        <div className='items-center flex gap-4'>
          {/* Light/Dark Mode Toggle */}
          <Switch
            checked={theme === 'dark'}
            onChange={toggleTheme}
            checkedChildren={<MoonOutlined />}
            unCheckedChildren={<SunOutlined />}
          />
          <Button
            type="text"
            onClick={showLogoutModal}
            icon={<LoginOutlined />}
            style={{
              fontSize: '28px',
              width: 44,
              height: 44,
              marginRight: 30,
              fontFamily: 'monospace',
              color: 'white',
              backgroundColor: 'transparent',
            }}
          />
          <Button
            block
            type="primary"
            htmlType="submit"
            className='bg-green-300 hover:bg-green-900 h-20 text-white rounded-sm'
            onClick={showModal}
          >
            Добавить компания
          </Button>
        </div>
      </div>

      <CategoriesModal open={isModalOpen} handleClose={handleClose} update={update} />

      {/* Table component */}
      <div className={styles.container}>
        <Table
          className={styles.customTable}
          onChange={handleTableChange}
          dataSource={tableData.map((item: CategoryType) => ({ ...item, key: item.id }))}
          pagination={{
            current: params.page,
            pageSize: params.limit,
            total: total,
            showSizeChanger: true,
            pageSizeOptions: ['2', '4', '6', '10']
          }}
          columns={[
            { title: 'Названия компании', dataIndex: 'name' },
            { title: 'Количество сотрудников', dataIndex: 'count' },
            {
              title: '',
              key: 'action',
              width: '40px',
              render: (record: CategoryType) => (
                <CustomDropdown
                  onEdit={() => editData(record)}
                  onDelete={() => deleteData(record.id)}
                />
              ),
            },
          ]}
        />
      </div>
      <Modal
        title="Confirm Logout"
        open={isLogoutModalVisible}
        onOk={handleLogoutOk}
        onCancel={handleLogoutCancel}
        okText="Logout"
        cancelText="Cancel"
        okButtonProps={{
          style: { backgroundColor: 'orangered', borderColor: 'orangered', color: '#fff', marginLeft: 10, padding: 4 },
        }}
      >
        <p>Are you sure you want to log out?</p>
      </Modal>
    </div>
  );
};

export default App;