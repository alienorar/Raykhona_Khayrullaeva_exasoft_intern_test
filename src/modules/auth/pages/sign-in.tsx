import { Button, Form, Input, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import '../../../index.css';
import authBg from '../../../assets/auth-bg.jpg';

const Login: React.FC = () => {
  const { Link } = Typography;
  const navigate = useNavigate();

  const onFinish = async (values: any): Promise<void> => {
    console.log("Login values:", values);
    navigate("/dashboard"); // Login qilinganidan so'ng boshqa sahifaga yo'naltirish
  };

  return (
    <div
      className="auth bg-center bg-cover h-screen flex justify-center items-center"
      style={{ backgroundImage: `url(${authBg})` }}
    >
      {/* Blurred overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

      {/* Form container */}
      <div className="relative bg-white rounded-sm shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Вход</h1>

        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          {/* Login Field */}
          <Form.Item
            label="Логин"
            name="login"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[{ required: true, message: 'Пожалуйста, введите ваш логин!' }]}
          >
            <Input
              placeholder="Введите логин"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              style={{ height: "40px" }}
            />
          </Form.Item>

          {/* Password Field */}
          <Form.Item
            label="Пароль"
            name="password"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[{ required: true, message: 'Пожалуйста, введите ваш пароль!' }]}
          >
            <Input.Password
              placeholder="Введите пароль"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              style={{ height: "40px" }}
            />
          </Form.Item>

          {/* Login Button */}
          <Form.Item>
            <Button block type="primary" htmlType="submit" className='bg-green-300 hover:bg-green-900 h-20 text-white rounded-sm'>
              Вход
            </Button>
          </Form.Item>

          {/* Registration Link */}
          <Form.Item>
            <div className="text-center text-gray-600">
              Нет аккаунта?{' '}
              <Link
                href="/sign-up"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Регистрация
              </Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;