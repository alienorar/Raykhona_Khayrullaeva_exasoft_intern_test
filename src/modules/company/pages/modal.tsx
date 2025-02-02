import { Modal, Form, Input, Button } from 'antd';
import { useEffect } from 'react';
import { CategoryModal, CategoryType } from '../types';
import { useCreateCategory, useUpdateCategory } from '../hooks/mutations';

const CategoriesModal = ({ open, handleClose, update }: CategoryModal) => {
    const [form] = Form.useForm();
    const { mutate: createMutate, isLoading: isCreating } = useCreateCategory();
    const { mutate: updateMutate, isLoading: isUpdating } = useUpdateCategory();

    useEffect(() => {
        if (update) {
            form.setFieldsValue({
                name: update.name,
            });
        } else {
            form.resetFields();
        }
    }, [open, update, form]);

    const onFinish = (values: CategoryType) => {
        if (update?.id) {
            const payload = { ...values, id: update?.id };
            updateMutate(payload, {
                onSuccess: () => {
                    form.resetFields();
                    handleClose();
                },
            });
        } else {
            createMutate(values, {
                onSuccess: () => {
                    form.resetFields();
                    handleClose();
                },
            });
        }
    };
    return (
        <Modal
            title="Добавить компания"
            open={open}
            onCancel={handleClose}
            footer={null}
        >
            <Form
                form={form}
                name="company_form"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
                onFinish={onFinish}
            >
                {/* Company Name Field */}
                <Form.Item
                    label="Названия компании"
                    name="name"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ marginBottom: 16 }}
                    rules={[
                        {
                            required: true,
                            message: 'Введите названия компании!',
                        },
                    ]}
                >
                    <Input
                        placeholder="Введите названия"
                        className="h-10 border-[0.5px]"
                    />
                </Form.Item>

                {/* Number of Employees Field */}
                <Form.Item
                    label="Количество сотрудников"
                    name="count"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ marginBottom: 16 }}
                    rules={[
                        {
                            required: true,
                            message: 'Введите количество сотрудников!',
                        },
                    ]}
                >
                    <Input
                        placeholder="Введите количество"
                        className="h-10 border-[0.5px]"
                    />
                </Form.Item>

                {/* Submit Button */}
                <Form.Item>
                    <Button
                        block
                        htmlType="submit"
                        style={{
                            backgroundColor: '#7CB305',
                            color: 'white',
                            height: 40,
                            fontSize: '18px',
                            marginTop: 10,
                        }}
                        loading={isCreating || isUpdating}
                    >
                        {update.id ? 'Обновить' : 'Добавить компания'}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CategoriesModal;   