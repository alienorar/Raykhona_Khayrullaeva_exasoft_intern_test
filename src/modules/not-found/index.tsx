import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import '../../index.css';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            {/* Result container */}
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md text-center">
                <Result
                    status="404"
                    title="404"
                    subTitle="Извините, страница, которую вы ищете, не существует."
                    extra={
                        <Button
                            type="primary"
                            onClick={() => navigate('company')}
                            className="bg-green-300 hover:bg-green-900 text-white rounded-sm"
                            style={{ height: "40px", fontSize: "16px", width: "100%" }}
                        >
                            Вернуться на главную
                        </Button>
                    }
                />
            </div>
        </div>
    );
};

export default NotFound;